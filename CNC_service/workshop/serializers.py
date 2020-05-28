from rest_framework import serializers
from .models import Request_For_Trouble


class Request_For_TroubleSerializer(serializers.ModelSerializer):
    area = serializers.StringRelatedField()
    boss_workshop = serializers.StringRelatedField()
    boss_area = serializers.StringRelatedField()


    class Meta:
        model = Request_For_Trouble
        fields = ('area', 'boss_workshop',
                  'boss_area', 'date_request', 'comment', 'status', 'pk')

    def create(self, validated_data):
        return Request_For_Trouble.objects.create(**validated_data)
