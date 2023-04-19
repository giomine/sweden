from .common import AttractionSerializer
from cities.serializers.common import CitySerializer
from users.serializers.common import UserSerializer

class PopulatedAttractionSerializer(AttractionSerializer):
    city = CitySerializer()
    owner = UserSerializer()