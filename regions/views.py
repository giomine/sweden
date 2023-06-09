from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Region
from .serializers.common import RegionSerializer
from lib.exceptions import exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


class RegionsListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # ENDPOINT GET /api/regions/
    @exceptions
    def get(self, request):
        region = Region.objects.all()
        serialized_regions = RegionSerializer(region, many=True)
        return Response(serialized_regions.data)
    
    # ENDPOINT POST /api/regions/
    # -- OWNER IS ADDED TO ENTRY --
    @exceptions
    def post(self, request):
        region_to_create = RegionSerializer(data={ **request.data, 'owner': request.user.id })
        region_to_create.is_valid(raise_exception=True)
        region_to_create.save()
        return Response(region_to_create.data, status.HTTP_201_CREATED)
    

class RegionSingleView(APIView):
    # ENDPOINT GET /api/regions/<pk>/
    @exceptions
    def get(self, request, pk):
        region = Region.objects.get(pk=pk)
        serialized_region = RegionSerializer(region)
        return Response(serialized_region.data, status.HTTP_200_OK)
    

    # ENDPOINT PUT /api/regions/<pk>/
    # -- ONLY OWNER CAN UPDATE REGION --
    @exceptions
    def put(self, request, pk):
        region_to_update = Region.objects.get(pk=pk)
        if region_to_update.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_region_to_update = RegionSerializer(region_to_update, request.data, partial=True)
        serialized_region_to_update.is_valid(raise_exception=True)
        serialized_region_to_update.save()
        return Response(serialized_region_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/regions/<pk>/
    # -- ONLY OWNER CAN DELETE REGION --
    @exceptions
    def delete(self, request, pk):
        region_to_delete = Region.objects.get(pk=pk)
        if region_to_delete.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        region_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)