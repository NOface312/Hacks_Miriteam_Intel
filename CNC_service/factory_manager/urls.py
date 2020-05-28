from django.urls import path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from .views import Workshop_API_LIST, Workshop_API_DETAIL, Area_API_LIST, Area_API_DETAIL, CNC_API_LIST, CNC_API_DETAIL


urlpatterns = [
    path('workshop/',
         Workshop_API_LIST.as_view(), name="workshop_all"),
    path('workshop/<int:pk>/', Workshop_API_DETAIL.as_view()),
    path('area/',
         Area_API_LIST.as_view(), name="test"),
    path('area/<int:pk>/', Area_API_DETAIL.as_view()),
    path('cnc/',
         CNC_API_LIST.as_view(), name="test"),
    path('cnc/<int:pk>/', CNC_API_DETAIL.as_view()),
]
