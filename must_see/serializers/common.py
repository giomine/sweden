from rest_framework.serializers import ModelSerializer
from ..models import MustSee

class MustSerializer(ModelSerializer):
    class Meta:
        model = MustSee
        fields = '__all__'