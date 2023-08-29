#透過 serializer 將資料進行序列化，與 Model 進行互動

from rest_framework import serializers
from backend.models import *
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class LikesSerializer(serializers.ModelSerializer):
    pId_pic = serializers.CharField(source='pId.picture_set.first.picture', read_only = True)

    class Meta:
        model= Like
        fields = '__all__'

class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Picture
        fields = '__all__'

class OrdersSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='pId.name', read_only=True)

    class Meta:
        model = Orders
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    pId_name = serializers.CharField(source='pId.name', read_only = True)
    pId_brand = serializers.CharField(source='pId.brand',read_only = True)
    pId_price = serializers.DecimalField(source='pId.price', max_digits=10, decimal_places=2,read_only = True)
    pId_pic = serializers.CharField(source='pId.picture_set.first.picture', read_only = True)
    
    class Meta:
        model = Cart
        fields = '__all__'


#--------vinn--------#
class RegisterSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = Member
        fields = ['mail', 'name', 'password']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')

        if not username.isalnum():
            raise serializers.ValidationError("Username must be alphanumeric.")

        if not email:
            raise serializers.ValidationError('Email field is required.')

        return attrs

    # def create(self, validated_data):
    #     return Member.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6,write_only=True)
    username = serializers.CharField(max_length=255, min_length=3)
    tokens = serializers.SerializerMethodField()
    def get_tokens(self, obj):
        user = Member.objects.get(username=obj['username'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }
    class Meta:
        model = Member
        fields = ['password','name','tokens']
    def validate(self, attrs):
        username = attrs.get('name','')
        password = attrs.get('password','')
        user = auth.authenticate(username=username,password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'email': user.email,
            'username': user.name,
            'tokens': user.tokens
        }

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs
    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')