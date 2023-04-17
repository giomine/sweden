from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import City
from .serializers.common import CitySerializer
from .serializers.populate import PopulatedCitySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from lib.exceptions import exceptions

class CitiesListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # ENDPOINT GET /api/sweden/
    @exceptions
    def get(self, request):
        cities = City.objects.all()
        serialized_cities = PopulatedCitySerializer(cities, many=True)
        return Response(serialized_cities.data)
    

    # ENDPOINT POST /api/sweden/
    # -- OWNER IS ADDED TO ENTRY --
    @exceptions
    def post(self, request):
        city_to_create = CitySerializer(data={ **request.data, 'owner': request.user.id })
        city_to_create.is_valid(raise_exception=True)
        city_to_create.save()
        return Response(city_to_create.data, status.HTTP_201_CREATED)
    
class CitySingleView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # ENDPOINT GET /api/sweden/<pk>
    @exceptions
    def get(self, request, pk):
        city = City.objects.get(pk=pk)
        serialized_city = PopulatedCitySerializer(city)
        return Response(serialized_city.data, status.HTTP_200_OK)
    

    # ENDPOINT PUT /api/sweden/<pk>
    # -- ONLY OWNER CAN UPDATE CITY --
    @exceptions
    def put(self, request, pk):
        city_to_update = City.objects.get(pk=pk)
        if city_to_update.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_city_to_update = CitySerializer(city_to_update, request.data, partial=True)
        serialized_city_to_update.is_valid(raise_exception=True)
        serialized_city_to_update.save()
        return Response(serialized_city_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/sweden/<pk>
    # -- ONLY OWNER CAN DELETE CITY --
    @exceptions
    def delete(self, request, pk):
        city_to_delete = City.objects.get(pk=pk)
        if city_to_delete.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        city_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)