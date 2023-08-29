#透過 serializer 將資料進行序列化，與 Model 進行互動

from rest_framework import serializers
from backend.models import *
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class MemberSerializer(serializers.ModelSerializer):
    like_pic_pId = serializers.IntegerField(source='mId.pId', read_only=True)
    pic_url = serializers.CharField(source='like_pic_pId.picture', read_only=True)

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
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        if not username.isalnum():
            raise serializers.ValidationError(
                self.default_error_messages)
        if not email:
            raise serializers.ValidationError('Email field is required')
        return attrs
    def create(self, validated_data):
        member = Member()
        member.save()
        print(member)
        user = User.objects.create_user(**validated_data, member_id = member.mid)
        print(user)
        return user
    

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
        fields = ['password','username','tokens']
    def validate(self, attrs):
        username = attrs.get('username','')
        password = attrs.get('password','')
        user = auth.authenticate(username=username,password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'email': user.email,
            'username': user.username,
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