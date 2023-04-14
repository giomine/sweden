from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Fact
from .serializers.common import FactSerializer


class FactsListView(APIView):
    # ENDPOINT GET /api/facts/
    def get(self, request):
        facts = Fact.objects.all()
        serialized_facts = FactSerializer(facts, many=True)
        return Response(serialized_facts.data)
    
    # ENDPOINT POST /api/facts/
    def post(self, request):
        fact_to_create = FactSerializer(data=request.data)
        fact_to_create.is_valid(raise_exception=True)
        fact_to_create.save()
        return Response(fact_to_create.data, status.HTTP_202_ACCEPTED)
    

class FactSingleView(APIView):
    # ENDPOINT GET /api/facts/<pk>
    def get(self, request, pk):
        fact = Fact.objects.get(pk=pk)
        serialized_fact = FactSerializer(fact)
        return Response(serialized_fact.data, status.HTTP_200_OK)
    
    
    # ENDPOINT PUT /api/facts/<pk>
    def put(self, request, pk):
        fact_to_update = Fact.objects.get(pk=pk)
        serialized_fact_to_update = FactSerializer(fact_to_update, request.data, partial=True)
        serialized_fact_to_update.is_valid(raise_exception=True)
        serialized_fact_to_update.save()
        return Response(serialized_fact_to_update.data, status.HTTP_202_ACCEPTED)
    

    # ENDPOINT DELETE /api/facts/<pk>
    def delete(self, request, pk):
        fact_to_delete = Fact.objects.get(pk=pk)
        fact_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)