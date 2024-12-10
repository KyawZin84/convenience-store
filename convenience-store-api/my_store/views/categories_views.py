from .imports import *
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CategoriesIndex(request):
    try:
        categories = CategoriesModel.objects.all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(categories, request)
        seri = CategoriesSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":f"{e}"}, status=500)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CategoriesStore(request):
    seri = CategoriesSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def CategoriesShow(request, pk):
    try:
        categories = CategoriesModel.objects.get(pk=pk)
        seri = CategoriesSerializer(categories)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def CategoriesUpdate(request, pk):
    try:
        categories = CategoriesModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = CategoriesSerializer(categories, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CategoriesDelete(request, pk):
    try:
        categories = CategoriesModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    categories.delete()
    return Response({"message":"Deleted Successfully"},status=200)