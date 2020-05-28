from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import (
     ObtainTokenPairWithColorView, 
     CustomUserCreate, 
     HelloWorldView, 
     LogoutAndBlacklistRefreshTokenForUserView, 
     User_API_LIST, 
     User_API_DETAIL,
)

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(),
         name='blacklist'),
    path('user/',
         User_API_LIST.as_view(), name="user_all"),
    path('user/<int:pk>/', User_API_DETAIL.as_view()),
]
