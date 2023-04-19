from .common import CitySerializer
from regions.serializers.common import RegionSerializer
from attractions.serializers.common import MustSerializer
from users.serializers.common import UserSerializer

class PopulatedCitySerializer(CitySerializer):
    region = RegionSerializer()
    musts = MustSerializer(many=True)
    owner = UserSerializer()