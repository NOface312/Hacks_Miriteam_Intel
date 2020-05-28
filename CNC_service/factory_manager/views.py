from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from random import randint
import time
# Create your views here.


#---WORKSHOP_LOGIK-----
class Workshop_API_LIST(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()
    
    def get(self, request):
        workshop = Workshop.objects.all()
        serializer = WorkshopSerializer(workshop, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        print("faf")
        data = request.data
        serializer = WorkshopSerializer(data=data)
        if serializer.is_valid():
            workshop = serializer.save()
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Workshop_API_DETAIL(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get_object(self, pk):
        try:
            return Workshop.objects.get(pk=pk)
        except Workshop.DoesNotExist:
            raise Http404

    def get(self, request, pk, format='json'):
        workshop = self.get_object(pk)
        serializer = WorkshopSerializer(workshop)
        return Response(serializer.data)

    def put(self, request, pk, format='json'):
        print(pk)
        workshop = self.get_object(pk)
        serializer = WorkshopSerializer(workshop, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format='json'):
        workshop = self.get_object(pk)
        workshop.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#---AREA_LOGIK-----
class Area_API_LIST(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        area = Area.objects.all()
        serializer = AreaSerializer(area, many=True)
        return Response(serializer.data)

    def post(self, request, format='json'):
        data = request.data
        serializer = AreaSerializer(data=data)
        if serializer.is_valid():
            area = serializer.save()
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Area_API_DETAIL(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get_object(self, pk):
        try:
            return Area.objects.get(pk=pk)
        except Area.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        area = self.get_object(pk)
        serializer = AreaSerializer(area)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        area = self.get_object(pk)
        serializer = AreaSerializer(area, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        area = self.get_object(pk)
        area.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

#---CNC_LOGIK-----


class CNC_API_LIST(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        cnc = CNC.objects.all()
        for cn in cnc:
            temp = randint(0, 100)
            cn.congestion = temp
            cn.date = round(time.time())
        serializer = CNCSerializer(cnc, many=True)
        return Response(serializer.data)

    def post(self, request, format='json'):
        data = request.data
        try:
            area = Area.objects.get(name=request.data['area'])
            workshop = Workshop.objects.get(name=request.data['workshop'])
        except:
            return Response("errors", status=status.HTTP_400_BAD_REQUEST)
        data['area'] = ""
        data['workshop'] = ""
        serializer = CNCSerializer(data=data)
        if serializer.is_valid():
            cnc = serializer.save()
            cnc.area = area
            cnc.workshop = workshop
            cnc.save()
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CNC_API_DETAIL(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get_object(self, pk):
        try:
            return CNC.objects.get(pk=pk)
        except CNC.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        cnc = self.get_object(pk)
        serializer = CNCSerializer(cnc)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        cnc = self.get_object(pk)
        data = request.data
        try:
            area = Area.objects.get(name=request.data['area'])
            workshop = Workshop.objects.get(name=request.data['workshop'])
        except:
            return Response("errors", status=status.HTTP_400_BAD_REQUEST)
        data['area'] = ""
        data['workshop'] = ""
        serializer = CNCSerializer(cnc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            cnc.area = area
            cnc.workshop = workshop
            cnc.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        cnc = self.get_object(pk)
        cnc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
