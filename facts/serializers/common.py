from rest_framework.serializers import ModelSerializer
from ..models import Fact

class FactSerializer(ModelSerializer):
    class Meta:
        model = Fact
        fields = '__all__'