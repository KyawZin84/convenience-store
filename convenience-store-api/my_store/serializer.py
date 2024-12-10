from rest_framework import serializers
from my_store.models import *

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoriesModel
        fields = "__all__"

class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilesModel
        fields = "__all__"

class ItemsSerializer(serializers.ModelSerializer):
    # files = FilesSerializer()
    # categories = CategoriesSerializer()
    class Meta:
        model = ItemsModel
        fields = "__all__"
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['files'] = FilesSerializer(instance.files).data
        data['categories'] = CategoriesSerializer(instance.categories).data
        return data

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderModel
        fields = "__all__"

class OrderItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order_ItemsModel
        fields = "__all__"

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopModel
        fields = "__all__"

class InvoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoicesModel
        fields = "__all__"

# Roles and Permissions
class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolesModel
        fields = "__all__"

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersModel
        fields = "__all__"

class PermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PermissionsModel
        fields = "__all__"