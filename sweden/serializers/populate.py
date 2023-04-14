from .common import CitySerializer
from facts.serializers.common import FactSerializer

class PopulatedCitySerializer(CitySerializer):
    facts = FactSerializer(many=True)