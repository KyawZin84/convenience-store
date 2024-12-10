from django.contrib import admin
from my_store.models import CategoriesModel, FilesModel, ItemsModel, OrderModel, Order_ItemsModel, ShopModel, InvoicesModel, RolesModel, UsersModel, PermissionsModel
# Register your models here.

admin.site.register(CategoriesModel)
admin.site.register(FilesModel)
admin.site.register(ItemsModel)
admin.site.register(OrderModel)
admin.site.register(Order_ItemsModel)
admin.site.register(ShopModel)
admin.site.register(InvoicesModel)
admin.site.register(RolesModel)
admin.site.register(UsersModel)
admin.site.register(PermissionsModel)