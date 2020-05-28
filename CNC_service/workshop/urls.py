from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import Request_For_Trouble_API_LIST, Request_For_Trouble_API_DETAIL
urlpatterns = [
    path('for_trouble/', Request_For_Trouble_API_LIST.as_view(), name="test"),
    path('for_trouble/<int:pk>/', Request_For_Trouble_API_DETAIL.as_view())
]
