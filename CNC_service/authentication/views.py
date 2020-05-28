from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *
from stuff.models import Stuff
from factory_manager.models import Area, Workshop
from django.conf import settings


class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request, format='json'):
        data = request.data
        model = Stuff
        FIO = data['surname'] + " " + data['name'] + " " + data['second_name']
        email = data['email']
        stuff = None
        flag = False
        try:
            stuff = Stuff.objects.get(FIO=FIO)
            stuff = Stuff.objects.get(email=email)
            data['phone'] = stuff.phone
            data['position'] = stuff.position
            flag = False
        except:
            flag = True
        if flag:
            try:
                stuff = Stuff.objects.get(FIO=FIO)
                stuff = Stuff.objects.get(email=email)
                data['phone'] = stuff.phone
                data['position'] = stuff.position
                flag = False
            except:
                flag = True
        serializer = CustomUserSerializer(data = data)
        if flag:
            print("user not found")
            return Response("user not found", status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            user = serializer.save()
            true_user = CustomUser.objects.get(
                email=data['email'])
            workshop = Workshop.objects.get(name=stuff.workshop)
            area = Area.objects.get(name=stuff.area)
            true_user.workshop = workshop
            true_user.area = area
            true_user.FIO = FIO
            true_user.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class CustomUserGet(APIView):
    """def get(self, request):
        data = CustomUser.objects.get(id=1)
        print(data)
        return Response(data={"hello": data.username}, status=status.HTTP_200_OK)"""

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get(self, request, *args, **kwargs):
        # serializer to handle turning our `User` object into something that
        # can be JSONified and sent to the client.
        serializer = self.serializer_class(request.user)

        return Response(serializer.data, status=status.HTTP_200_OK)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)


@api_view(['GET'])
def current_user(request):
    serializer = CustomUserSerializer(request.user)
    return Response(serializer.data)


class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class User_API_LIST(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        user = CustomUser.objects.all()
        serializer = CustomUserSerializer(user, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class User_API_DETAIL(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get_object(self, pk):
        try:
            return CustomUser.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http404

    def get(self, request, pk, format='json'):
        user = self.get_object(pk)
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)
