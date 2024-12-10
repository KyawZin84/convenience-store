from .imports import *
# Create your views here.

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def OrderIndex(request):
    try:
        order = OrderModel.objects.all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(order, request)
        seri = OrderSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":f"{e}"}, status=500)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def OrderStore(request):
    seri = OrderSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        print(seri.errors)
        return Response(seri.errors, status=400)
    
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def OrderShow(request, pk):
    try:
        order = OrderModel.objects.get(pk=pk)
        seri = OrderSerializer(order)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
def OrderUpdate(request, pk):
    try:
        order = OrderModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = OrderSerializer(order, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)
    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def OrderDelete(request, pk):
    try:
        order = OrderModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    order.delete()
    return Response({"message":"Deleted Successfully"},status=200)