from rest_framework import serializers
from .models import Request_For_Repair


class Request_For_RepairSerializer(serializers.ModelSerializer):
    cnc = serializers.StringRelatedField()
    boss_repair = serializers.StringRelatedField()
    worker = serializers.StringRelatedField()


    class Meta:
        model = Request_For_Repair
        fields = ('cnc', 'boss_repair',
                  'worker', 'date_request', 'date_deadline', 'comment', 'status', 'pk')

    def create(self, validated_data):
        return Request_For_Repair.objects.create(**validated_data)
