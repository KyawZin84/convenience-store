from .imports import *
# Create your views here.

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def ItemsIndex(request):
    try:
        items = ItemsModel.objects.select_related('files').all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(items, request)
        seri = ItemsSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":str(e)}, status=500)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def ItemsStore(request):
    seri = ItemsSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        print(seri.errors)
        return Response(seri.errors, status=400)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def ItemsShow(request, pk):
    try:
        items = ItemsModel.objects.get(pk=pk)
        seri = ItemsSerializer(items)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
def ItemsUpdate(request, pk):
    try:
        items = ItemsModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = ItemsSerializer(items, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)

@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
def Itemspatch(request,pk):
    try:
        items = ItemsModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = ItemsSerializer(items, data=request.data,partial=True)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)

    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def ItemsDelete(request, pk):
    try:
        items = ItemsModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    items.delete()
    return Response({"message":"Deleted Successfully"},status=200)