from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import City
from .serializers.common import CitySerializer

class CitiesListView(APIView):
    # ENDPOINT GET /api/sweden/
    def get(self, request):
        # print('GET /api/sweden/ api endpoint hit')
        # return Response('GET /api/sweden/ api endpoint hit')
        cities = City.objects.all()
        serialized_cities = CitySerializer(cities, many=True)
        return Response(serialized_cities.data)
    

    # ENDPOINT POST /api/sweden/
    def post(self, request):
        # print('POST /api/sweden/ api endpoint hit')
        # return Response('POST /api/sweden/ api endpoint hit')
        city_to_create = CitySerializer(data=request.data)
        city_to_create.is_valid(raise_exception=True)
        city_to_create.save()
        return Response(city_to_create.data, status.HTTP_201_CREATED)
    
class CitySingleView(APIView):
    # ENDPOINT GET /api/sweden/<pk>
    def get(self, request, pk):
        city = City.objects.get(pk=pk)
        serialized_city = CitySerializer(city)
        return Response(serialized_city.data, status.HTTP_200_OK)
    

    # ENDPOINT PUT /api/sweden/<pk>
    def put(self, request, pk):
        city_to_update = City.objects.get(pk=pk)
        serialized_city_to_update = CitySerializer(city_to_update, request.data, partial=True)
        serialized_city_to_update.is_valid(raise_exception=True)
        serialized_city_to_update.save()
        return Response(serialized_city_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/sweden/<pk>
    def delete(self, request, pk):
        city_to_delete = City.objects.get(pk=pk)
        city_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)