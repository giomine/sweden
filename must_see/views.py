from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import MustSee
from .serializers.common import MustSerializer
from lib.exceptions import exceptions
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import PermissionDenied


class MustSeeListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )
    # ENDPOINT GET /api/mustsee/
    @exceptions
    def get(self, request):
        musts = MustSee.objects.all()
        serialized_musts = MustSerializer(musts, many=True)
        return Response(serialized_musts.data)
    
    # ENDPOINT POST /api/mustsee/
    # -- OWNER IS ADDED TO ENTRY --
    @exceptions
    def post(self, request):
        must_to_create = MustSerializer(data={ **request.data, 'owner': request.user.id })
        must_to_create.is_valid(raise_exception=True)
        must_to_create.save()
        return Response(must_to_create.data, status.HTTP_201_CREATED)
    

class MustSingleView(APIView):
    # ENDPOINT GET /api/mustsee/<pk>/
    @exceptions
    def get(self, request, pk):
        must = MustSee.objects.get(pk=pk)
        serialized_must = MustSerializer(must)
        return Response(serialized_must.data, status.HTTP_200_OK)
    

    # ENDPOINT PUT /api/mustsee/<pk>/
    # -- ONLY OWNER CAN UPDATE MUSTSEE --
    @exceptions
    def put(self, request, pk):
        must_to_update = MustSee.objects.get(pk=pk)
        if must_to_update.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        serialized_must_to_update = MustSerializer(must_to_update, request.data, partial=True)
        serialized_must_to_update.is_valid(raise_exception=True)
        serialized_must_to_update.save()
        return Response(serialized_must_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/mustsee/<pk>/
    # -- ONLY OWNER CAN DELETE MUSTSEE --
    @exceptions
    def delete(self, request, pk):
        must_to_delete = MustSee.objects.get(pk=pk)
        if must_to_delete.owner != request.user and not request.user.is_staff:
            raise PermissionDenied()
        must_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)