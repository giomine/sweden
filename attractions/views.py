from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Attraction
from .serializers.common import AttractionSerializer
from .serializers.populate import PopulatedAttractionSerializer
from lib.exceptions import exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


class AttractionsListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # ENDPOINT GET /api/mustsee/
    @exceptions
    def get(self, request):
        musts = Attraction.objects.all()
        serialized_musts = PopulatedAttractionSerializer(musts, many=True)
        return Response(serialized_musts.data)
    
    # ENDPOINT POST /api/mustsee/
    # -- OWNER IS ADDED TO ENTRY --
    @exceptions
    def post(self, request):
        must_to_create = AttractionSerializer(data={ **request.data, 'owner': request.user.id })
        must_to_create.is_valid(raise_exception=True)
        must_to_create.save()
        return Response(must_to_create.data, status.HTTP_201_CREATED)
    

class AttractionSingleView(APIView):
    # ENDPOINT GET /api/mustsee/<pk>/
    @exceptions
    def get(self, request, pk):
        must = Attraction.objects.get(pk=pk)
        serialized_must = AttractionSerializer(must)
        return Response(serialized_must.data, status.HTTP_200_OK)
    

    # ENDPOINT PUT /api/mustsee/<pk>/
    # -- ONLY OWNER CAN UPDATE MUSTSEE --
    @exceptions
    def put(self, request, pk):
        must_to_update = Attraction.objects.get(pk=pk)
        if must_to_update.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_must_to_update = AttractionSerializer(must_to_update, request.data, partial=True)
        serialized_must_to_update.is_valid(raise_exception=True)
        serialized_must_to_update.save()
        return Response(serialized_must_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/mustsee/<pk>/
    # -- ONLY OWNER CAN DELETE MUSTSEE --
    @exceptions
    def delete(self, request, pk):
        must_to_delete = Attraction.objects.get(pk=pk)
        if must_to_delete.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        must_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)