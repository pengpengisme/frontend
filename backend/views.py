import os
from django.shortcuts import redirect, get_object_or_404
from django.conf import settings
from django.http import JsonResponse
from django.middleware import csrf
from django.contrib.auth import login
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from backend.models import *
from backend.serializers import *
        
@api_view(['POST'])
def get_member(request):
    if 'mId' in request.data:
        mId = request.data['mId']
        member = Member.objects.get(mId=mId)
        serializer = MemberSerializer(member)
        return Response(serializer.data)
    else:
        return JsonResponse({'message': '存取失敗！'})

@api_view(['POST'])
def get_member_like(request):
    if 'mId' in request.data:
        mId = request.data['mId']
        member_like = Like.objects.filter(mId=mId)
        serializer = LikesSerializer(member_like, many=True)
        return Response(serializer.data)
    else:
        return JsonResponse({'message': '存取失敗!'})    

@api_view(['POST'])
def updateMember(request, mId):
    member = Member.objects.get(mId=mId)
    serializer = MemberSerializer(member, data=request.data['updatedData'], partial=True)  # 使用 MemberSerializer
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)

@api_view(['POST'])
def getMemberOrder(request):
    if 'mId' in request.data:
        mId = request.data['mId']
        state = request.query_params.get('state', None)
    
        if state == 'history':
            queryset = Orders.objects.select_related('pId').filter(state='history', mId=mId)  #歷史訂單
        elif state == 'to_ship':
            queryset = Orders.objects.select_related('pId').filter(state='to_ship', mId=mId)  #出貨中
        elif state == 'delivery':
            queryset = Orders.objects.select_related('pId').filter(state='delivery', mId=mId) #配送中
        elif state == 'renting':
            queryset = Orders.objects.select_related('pId').filter(state='renting', mId=mId)  #租借中
            
        serializer = OrdersSerializer(queryset, many=True) #如果沒有特別指定pk就要加many=True，不然系統會預設many=False
        return Response(serializer.data)
    else:
        return JsonResponse({'message': '存取失敗！'})

@api_view(['POST'])
def getAllProduct(request):
    queryset = Product.objects.filter(state='deposite')
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getProduct(request):
    state = request.query_params.get('state', None)
    
    if state == 'deposite':
        filtered_products = Product.objects.filter(state='deposite') #倉庫存放中
    elif state == 'to_ship':
        filtered_products = Product.objects.filter(state='to_ship')  #出貨中
    elif state == 'delivery':
        filtered_products = Product.objects.filter(state='delivery') #配送中
    elif state == 'renting':
        filtered_products = Product.objects.filter(state='renting')  #租借中
    elif state == 'takeoff':
        filtered_products = Product.objects.filter(state='takeoff')  #以下架商品

    queryset = filtered_products.select_related('picture')
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def updateProduct(request, pId):
    product = Product.objects.get(pId=pId)
    serializer = ProductSerializer(product, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)



#----------------kevin----------------#
@api_view(['GET'])
def getProducts(request, pId):
    product = Product.objects.get(pId=pId)
    serializer = ProductSerializer(product, many=False)#serializer
    return Response(serializer.data)

@api_view(['GET'])
def getPictures(request, pId):
    pictures = get_object_or_404(Picture, pk=pId)
    serializer = PictureSerializer(pictures)#serializer
    return Response(serializer.data)

@api_view(['GET'])
def getComments(request, pId):
    comments = Comment.objects.filter(pId=pId)
    serializer = CommentSerializer(comments, many=True)#serializer
    return Response(serializer.data)

# @api_view(['GET'])
# def getMember(request, mId):
#     member = Member.objects.filter(mId=mId)
#     serializer = MemberSerializer(member, many=True)#serializer
#     return Response(serializer.data)

@api_view(['POST'])
def addToCart(request):
    data = request.data
    pId = data['pId']
    mId = data['mId']
    product = Product.objects.get(pId=pId)
    member = Member.objects.get(mId=mId)
    cart = Cart.objects.create(
        pId = product,
        mId = member,
        cartTime = data['cartTime']
    )
    serializer = CartSerializer(cart, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def goCheck(request):
    data = request.data
    bagId = data['bagId']#bagId是一個存了數字的Array
    request.session['checkList'] = bagId
    print()
    return redirect('/#/checkout')

@api_view(['POST'])
def getCheck(request):
    bagIds = request.session.get('checkList', [])
    return Response(bagIds)

@api_view(['POST'])
def updateOrder(request):
    data = request.data
    pId = data['pId']
    mId = data['mId']
    product = Product.objects.get(pId=pId)
    member = Member.objects.get(mId=mId)
    order = Orders.objects.create(
        mId = member,
        pId = product,
        payment = data['payment'],
        order_time = data['order_time'],
        duration = data['duration'],
        address = data['address'],
        state = data['state'],
        startTime = data['startTime'],
        endTime = data['endTime']
    )
    serializer = OrdersSerializer(order, many=False)
    return redirect('/#/')

#----------------mei----------------#
class product_image:
    def __init__(self,title,url) -> None:
        self.title = title
        self.url = url

@api_view(['POST'])
def cart_api(request):
    if 'mId' in request.data:
        mId = request.data['mId']
        filtered_products = Cart.objects.filter(mId = mId)
        querycart = filtered_products.select_related('pId','pId__picture')
        serializer = CartSerializer(querycart, many=True)

        return Response(serializer.data)
    else:
        return JsonResponse({'message': '存取失敗！'}) 


@api_view(['DELETE'])
def cart_delete(request,cart_id):
    try:
        cart_item = Cart.objects.get(pId=cart_id)
        cart_item.delete()
        return Response({"message": "Cart item deleted successfully."}, status=200)
    except Cart.DoesNotExist:
        return Response({"error": "Cart item is not found"}, status=404)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def upload_product(request):
    if request.method == 'POST':
        form_data_json = request.data.get('page1')
        product_pic_files = request.FILES.getlist('product_pic')  # 使用 request.FILES 來獲取上傳的照片陣列
        auth_pic_files = request.FILES.getlist('auth_pic')
        print(form_data_json)
        print(product_pic_files)
        print(auth_pic_files)

        import json
        form_data = json.loads(form_data_json)
        products = Product(
            name=form_data['name'],
            brand=form_data['brand'],
            description=form_data['description'],
            age=form_data['age'],
            price = form_data['price'],
            size = form_data['length']+"*"+form_data['width']+"*"+form_data['height'] ,
            likes = 0,
            state = 'deposite',
            # 其他欄位根據需要添加
        )
        products.save()

        thispId = products.pId
        info_j = {
            "info": []
        }
        for file in product_pic_files:
            file_path = os.path.join(settings.MEDIA_ROOT, 'images', file.name)
            file_content = file.read()
            with open(file_path, 'wb') as destination_file:
                destination_file.write(file_content)
            print(file.name)
            info_j["info"].append({
                "title": file.name,
                "url": "./media/images/" + file.name
            })
        info_json = json.dumps(info_j, ensure_ascii=False)

        print(info_j)
        product_pic_save_to_db = Picture.objects.create(
            pId = products,
            picture = info_json,
        )

        return JsonResponse({'message': '照片上傳成功！'})
    return JsonResponse({'message': '請使用 POST 請求上傳照片。',})


#----------------vinnn----------------#
@api_view(['POST'])
def register_post(request):
    user=request.data
    serializer = RegisterSerializer(data=user)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    user_data = serializer.data
    return Response(user_data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@authentication_classes([SessionAuthentication])
def login_post(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data['username']
    email = serializer.validated_data['email']
    tokens = serializer.validated_data['tokens']

    # Set user in session
    user = auth.authenticate(request, username=username, password=serializer.validated_data['password'])

    if user is not None:
        auth.login(request, user)  # Set the user in the session
        request.session['username'] = username
        return Response({'username': username, 'email': email, 'tokens': tokens}, status=status.HTTP_200_OK)
        # return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return JsonResponse({"message": "Login failed. Invalid credentials."}, status=401)
        # raise AuthenticationFailed('Invalid credentials, try again')



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_post(request):
    serializer = LogoutSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def csrf_token(request):
    token = csrf.get_token(request)
    return JsonResponse({'csrfToken': token})

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

