from .common import CitySerializer
from regions.serializers.common import RegionSerializer
# from attractions.serializers.common import AttractionSerializer
from attractions.serializers.populate import PopulatedAttractionSerializer
# from users.serializers.common import UserSerializer

class PopulatedCitySerializer(CitySerializer):
    region = RegionSerializer()
    # attractions = AttractionSerializer(many=True)
    attractions = PopulatedAttractionSerializer(many=True)
    # owner = UserSerializer()