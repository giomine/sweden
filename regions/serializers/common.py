from rest_framework.serializers import ModelSerializer
from ..models import Region

class RegionSerializer(ModelSerializer):
    class Meta:
        model = Region
        fields = '__all__'