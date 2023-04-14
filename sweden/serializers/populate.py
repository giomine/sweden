from .common import CitySerializer
from facts.serializers.common import FactSerializer
# from regions.serializers.common import RegionSerializer

class PopulatedCitySerializer(CitySerializer):
    facts = FactSerializer(many=True)