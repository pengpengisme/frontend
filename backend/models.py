from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.hashers import make_password

class MemberManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, is_superuser = False, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


class Member(models.Model):
    mId = models.AutoField(db_column="mId", primary_key=True)
    username = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)#名
    last_name = models.CharField(max_length=255)#姓氏
    password = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    credit_card = models.CharField(max_length=255)
    mail = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    tokens = models.IntegerField(max_length=255)
    defaultimg = models.CharField(max_length=765)
    
    class Meta:
        db_table = "Member"
        
    objects = MemberManager()

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }
    
class Product(models.Model):
    pId = models.AutoField(db_column='pId', primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.IntegerField()
    brand = models.CharField(max_length=255)
    age = models.CharField(max_length=255)
    size = models.CharField(max_length=255)
    likes = models.IntegerField()
    state = models.CharField(max_length=255)

    class Meta:
        db_table = "Product"

class Picture(models.Model):
    pId = models.ForeignKey(Product, models.CASCADE, db_column="pId", primary_key=True)
    picture = models.CharField(max_length=255)

    class Meta:
        db_table= "Picture"
        unique_together = ('pId', 'picture')

class Orders(models.Model):
    oId = models.AutoField(db_column='oId', primary_key=True)
    mId = models.ForeignKey(Member, models.CASCADE, db_column="mId", null=True)
    pId = models.ForeignKey(Product, models.CASCADE, db_column="pId", null=True)
    payment = models.CharField(max_length=255)
    order_time = models.DateTimeField()
    duration = models.IntegerField()
    address = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    startTime = models.DateField(db_column='startTime')
    endTime = models.DateField(db_column='endTime')
    
    class Meta:
        db_table = "Orders"

class Comment(models.Model):
    pId = models.ForeignKey(Product, on_delete=models.CASCADE, db_column="pId")
    mId = models.ForeignKey(Member, on_delete=models.CASCADE, db_column="mId")
    cId = models.AutoField(primary_key=True)
    content = models.CharField(max_length=255)
    rank = models.IntegerField()

    class Meta:
        db_table = 'Comment'

class Cart(models.Model):
    pId = models.ForeignKey(Product, on_delete=models.CASCADE, db_column="pId", primary_key=True)
    mId = models.ForeignKey(Member, on_delete=models.CASCADE, db_column="mId")
    cartTime = models.DateTimeField(db_column="cartTime")
    startTime = models.DateField(db_column="startTime")
    endTime = models.DateField(db_column="endTime")
    
    class Meta:
        db_table = 'Cart'
        unique_together = ('mId', 'pId')


class User(models.Model):
    def set_password(self, raw_password):
        self.password = make_password(raw_password)
        self.save()
    id = models.AutoField(db_column='id', primary_key=True)
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=50)
    email = models.EmailField(max_length=255, unique=True, db_index=True)
    is_superuser = models.BooleanField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    member = models.OneToOneField(Member, on_delete=models.CASCADE, related_name='user')
    address = models.CharField(max_length=255)
    gender = models.CharField(max_length=10)
    objects = MemberManager()
     

    class Meta:
        managed = False
        db_table = 'auth_user'

    def __str__(self):
        return self.email
    
    def tokens(self):
        refresh = RefreshToken.for_user(self)

        return{
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }
    
class Like(models.Model):
    mId = models.ForeignKey(Member, on_delete=models.CASCADE, db_column="mId", primary_key=True)
    pId = models.ForeignKey(Product, on_delete=models.CASCADE, db_column="pId")

    class Meta:
        db_table = 'Likes'
        unique_together = ('mId', 'pId')