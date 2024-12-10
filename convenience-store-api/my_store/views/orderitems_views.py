from .imports import *
# Create your views here.

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def OrderItemsIndex(request):
    try:
        orderitems = Order_ItemsModel.objects.all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(orderitems, request)
        seri = OrderItemsSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":f"{e}"}, status=500)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def OrderItemsStore(request):
    seri = OrderItemsSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        print(seri.errors)
        return Response(seri.errors, status=400)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def OrderItemsShow(request, pk):
    try:
        orderitems = Order_ItemsModel.objects.get(pk=pk)
        seri = OrderItemsSerializer(orderitems)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
def OrderItemsUpdate(request, pk):
    try:
        orderitems = Order_ItemsModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = OrderItemsSerializer(orderitems, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)
    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def OrderItemsDelete(request, pk):
    try:
        orderitems = Order_ItemsModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    orderitems.delete()
    return Response({"message":"Deleted Successfully"},status=200)