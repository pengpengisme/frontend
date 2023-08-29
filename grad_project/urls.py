# from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from django.views.generic import TemplateView
from rest_framework_simplejwt import views as jwt_views
from backend import views

urlpatterns = [
    # path('admin/', admin.site.urls), //db.sqlite3
    path('', TemplateView.as_view(template_name='index.html')),
    path('member/', TemplateView.as_view(template_name='index.html')),
    path('member_order/', TemplateView.as_view(template_name='index.html')),
    path('member_edit/', TemplateView.as_view(template_name='index.html')),
    path('product/', TemplateView.as_view(template_name='index.html')),
    path('bag/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('checkout/', TemplateView.as_view(template_name='index.html')),
    path('endcheck/', TemplateView.as_view(template_name='index.html')),
    path('business/', TemplateView.as_view(template_name='index.html')),
    path('product_edit/<int:id>/', TemplateView.as_view(template_name='index.html')),
    path('login/', TemplateView.as_view(template_name='index.html')),
    path('signup/', TemplateView.as_view(template_name='index.html')),
    path('forget-password/', TemplateView.as_view(template_name='index.html')),
    path('update/', TemplateView.as_view(template_name='index.html')),

    path('api/member/', views.get_member, name="member"),
    path('api/member_likes/', views.get_member_like, name="likes"),
    path('api/member/updateMember/<int:mId>/', views.updateMember, name="upadateMember"),
    path('api/member/member_order/', views.getMemberOrder, name="member_order"),
    path('api/business/', views.getProduct, name="business"),
    path('api/update_product/<int:pId>/', views.updateProduct, name="updateProduct"),
    
    path('api/product/<int:pId>', views.getProducts, name="products"),
    path('api/picture/<int:pId>', views.getPictures, name="pictures"),
    path('api/comment/<int:pId>', views.getComments, name="comments"),
    path('api/member/<int:mId>', views.getMember, name="members"),
    path('api/member/addToCart/', views.addToCart, name="addToCart"),
    path('api/member/updateOrder/', views.updateOrder, name="updateOrder"),
    path('api/goCheck/', views.goCheck, name="goCheck"),
    path('api/getCheck/', views.getCheck, name="getCheck"),

    path('api/cart/', views.cart_api, name='cart_api'),
    path('api/cart/<int:cart_id>/', views.cart_delete, name='cart_delete'),
    path('api/upload_product/',views.upload_product, name='upload_product'),

    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name= 'token_refresh'),
    path('csrf-token/', views.csrf_token, name='csrf-token'),
    path('register/',views.register_post, name="register"),
    path('login/',views.login_post, name="login"),
    path('logout/', views.logout_post, name="logout"),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
