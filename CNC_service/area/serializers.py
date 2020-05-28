from rest_framework import serializers
from .models import Request_For_Boss_Repair


class Request_For_Boss_RepairSerializer(serializers.ModelSerializer):
    area = serializers.StringRelatedField()
    cnc = serializers.StringRelatedField()
    boss_area = serializers.StringRelatedField()
    boss_repair = serializers.StringRelatedField()


    class Meta:
        model = Request_For_Boss_Repair
        fields = ('area', 'cnc', 'boss_area',
                  'boss_repair', 'date_request', 'date_deadline', 'comment', 'status', 'type_request', 'pk')

    def create(self, validated_data):
        return Request_For_Boss_Repair.objects.create(**validated_data)
