from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import *
from .serializers import *
from authentication.models import CustomUser
from factory_manager.models import Area, CNC


class Request_For_Boss_Repair_API_LIST(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get(self, request):
        for_boss_repair = Request_For_Boss_Repair.objects.all()
        serializer = Request_For_Boss_RepairSerializer(for_boss_repair, many=True)
        return Response(serializer.data)

    def post(self, request, format='json'):
        data = request.data
        print(request.data)
        try:
            boss_repair = CustomUser.objects.get(
                FIO=request.data['boss_repair'])
            boss_area = CustomUser.objects.get(FIO=request.data['boss_area'])
            area = Area.objects.get(name=request.data['area'])
            cnc = CNC.objects.get(name=request.data['cnc'])
        except:
            return Response("errors", status=status.HTTP_400_BAD_REQUEST)
        data['boss_repair'] = ""
        data['boss_area'] = ""
        data['area'] = ""
        data['cnc'] = ""
        serializer = Request_For_Boss_RepairSerializer(data=data)
        if serializer.is_valid():
            for_boss_repair = serializer.save()
            for_boss_repair.boss_repair = boss_repair
            for_boss_repair.boss_area = boss_area
            for_boss_repair.area = area
            for_boss_repair.cnc = cnc
            for_boss_repair.save()
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Request_For_Boss_Repair_API_DETAIL(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def get_object(self, pk):
        try:
            return Request_For_Boss_Repair.objects.get(pk=pk)
        except Request_For_Boss_Repair.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        for_boss_repair = self.get_object(pk)
        serializer = Request_For_Boss_RepairSerializer(for_boss_repair)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        for_boss_repair = self.get_object(pk)
        data = request.data
        print(request.data)
        try:
            boss_repair = CustomUser.objects.get(
                FIO=request.data['boss_repair'])
            boss_area = CustomUser.objects.get(FIO=request.data['boss_area'])
            area = Area.objects.get(name=request.data['area'])
            cnc = CNC.objects.get(name=request.data['cnc'])
        except:
            return Response("errors", status=status.HTTP_400_BAD_REQUEST)
        data['boss_repair'] = ""
        data['boss_area'] = ""
        data['area'] = ""
        data['cnc'] = ""
        serializer = Request_For_Boss_RepairSerializer(for_boss_repair, data=request.data)
        if serializer.is_valid():
            serializer.save()
            for_boss_repair = serializer.save()
            for_boss_repair.boss_repair = boss_repair
            for_boss_repair.boss_area = boss_area
            for_boss_repair.area = area
            for_boss_repair.cnc = cnc
            for_boss_repair.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        for_boss_repair = self.get_object(pk)
        for_boss_repair.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
