from .imports import *
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ShopIndex(request):
    try:
        shop = ShopModel.objects.all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(shop, request)
        seri = ShopSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":f"{e}"}, status=500)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ShopStore(request):
    seri = ShopSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def ShopShow(request, pk):
    try:
        shop = ShopModel.objects.get(pk=pk)
        seri = ShopSerializer(shop)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def ShopUpdate(request, pk):
    try:
        shop = ShopModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = ShopSerializer(shop, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def ShopDelete(request, pk):
    try:
        shop = ShopModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    shop.delete()
    return Response({"message":"Deleted Successfully"},status=200)