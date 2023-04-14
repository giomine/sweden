from .common import CitySerializer
from facts.serializers.common import FactSerializer
from regions.serializers.common import RegionSerializer
from must_see.serializers.common import MustSerializer

class PopulatedCitySerializer(CitySerializer):
    facts = FactSerializer(many=True)
    region = RegionSerializer()
    musts = MustSerializer(many=True)