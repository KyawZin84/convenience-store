from .imports import *
# Create your views here.

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def InvoicesIndex(request):
    try:
        invoices = InvoicesModel.objects.all()
        paginator = CustomPagination()
        page_obj = paginator.paginate_queryset(invoices, request)
        seri = InvoicesSerializer(page_obj, many=True)
        return paginator.get_paginated_response(seri.data)
    except Exception as e:
        return Response({"error":f"{e}"}, status=500)
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
def InvoicesStore(request):
    seri = InvoicesSerializer(data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=201)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
def InvoicesShow(request, pk):
    try:
        invoices = InvoicesModel.objects.get(pk=pk)
        seri = InvoicesSerializer(invoices)
        return Response(seri.data, status=200)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
def InvoicesUpdate(request, pk):
    try:
        invoices = InvoicesModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    seri = InvoicesSerializer(invoices, data=request.data)
    if seri.is_valid():
        seri.save()
        return Response(seri.data, status=200)
    else:
        return Response(seri.errors, status=400)
    

@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
def InvoicesDelete(request, pk):
    try:
        invoices = InvoicesModel.objects.get(pk=pk)
    except Exception:
        return Response({"errors":"Post Not Found!"}, status=204)
    invoices.delete()
    return Response({"message":"Deleted Successfully"},status=200)