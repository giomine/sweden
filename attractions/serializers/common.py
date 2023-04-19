from rest_framework.serializers import ModelSerializer
from ..models import Attraction

class MustSerializer(ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'