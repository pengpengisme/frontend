#透過 serializer 將資料進行序列化，與 Model 進行互動

from rest_framework import serializers
from backend.models import *
from django.contrib import auth
from django.conf import settings
from django.http import request
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    pic = serializers.SerializerMethodField(method_name='get_pic')

    def get_pic(self, obj):
        if obj.picture_set.exists():
            return obj.picture_set.first().picture
        return None
    
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
    product_pic = serializers.CharField(source='pId.picture_set.first.picture', read_only = True)

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
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Member
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password','last_name','first_name','gender','address']

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
        if not username.isalnum():#檢查用戶是否為字母數字
            raise serializers.ValidationError(
                self.default_error_messages)
        if not email:
            raise serializers.ValidationError('Email field is required')
        return attrs
    
    def create(self, validated_data):#創建新用戶
        print(validated_data)
        member = Member(username = validated_data["username"], mail = validated_data["email"],first_name= validated_data["first_name"],last_name= validated_data["last_name"],gender= validated_data["gender"],address= validated_data["address"],defaultimg="http://127.0.0.1:8000/media/images/defaultimg.png")
        member.save()
        user = User.objects.create_user(**validated_data, member_id =member.mId)  #hash
        return user
    

class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6,write_only=True)
    username = serializers.CharField(max_length=255, min_length=3)
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = Member.objects.get(username=obj['username'])
        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access'],
        }
    class Meta:
        model = Member
        fields = ['password','username','tokens']

   
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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    def get_token(cls, user):
        token = super().get_token(user)
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data["mId"] = user.id

        return data