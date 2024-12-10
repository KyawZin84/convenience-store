from django.urls import path

from my_store.views import categories_views, files_views, items_views, order_views, orderitems_views, shop_views, roles_views, users_views, permissions_views,invoices_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    path('auth/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('categories/all', categories_views.CategoriesIndex),
    path('categories/add', categories_views.CategoriesStore),
    path('categories/view/<int:pk>', categories_views.CategoriesShow),
    path('categories/change/<int:pk>', categories_views.CategoriesUpdate),
    path('categories/delete/<int:pk>', categories_views.CategoriesDelete),

    path('files/all', files_views.FilesIndex),
    path('files/add', files_views.FilesStore),
    path('files/view/<int:pk>', files_views.FilesShow),
    path('files/change/<int:pk>', files_views.FilesUpdate),
    path('files/delete/<int:pk>', files_views.FilesDelete),

    path('items/add', items_views.ItemsStore),
    path('items/all', items_views.ItemsIndex),
    path('items/view/<int:pk>', items_views.ItemsShow),
    path('items/change/<int:pk>', items_views.ItemsUpdate),
    path('items/patch/<int:pk>', items_views.Itemspatch),
    path('items/delete/<int:pk>', items_views.ItemsDelete),

    path('invoices/add', invoices_views.InvoicesStore),
    path('invoices/all', invoices_views.InvoicesIndex),
    path('invoices/view/<int:pk>', invoices_views.InvoicesShow),
    path('invoices/change/<int:pk>', invoices_views.InvoicesUpdate),
    path('invoices/delete/<int:pk>', invoices_views.InvoicesDelete),


    path('orders/add', order_views.OrderStore),
    path('orders/all', order_views.OrderIndex),
    path('orders/view/<int:pk>', order_views.OrderShow),
    path('orders/change/<int:pk>', order_views.OrderUpdate),
    path('orders/delete/<int:pk>', order_views.OrderDelete),

    path('orderitems/add', orderitems_views.OrderItemsStore),
    path('orderitems/all', orderitems_views.OrderItemsIndex),
    path('orderitems/view/<int:pk>', orderitems_views.OrderItemsShow),
    path('orderitems/change/<int:pk>', orderitems_views.OrderItemsUpdate),
    path('orderitems/delete/<int:pk>', orderitems_views.OrderItemsDelete),

    path('shop/add', shop_views.ShopStore),
    path('shop/all', shop_views.ShopIndex),
    path('shop/view/<int:pk>', shop_views.ShopShow),
    path('shop/change/<int:pk>', shop_views.ShopUpdate),
    path('shop/delete/<int:pk>', shop_views.ShopDelete),

    # roles and permission
    path('roles/add', roles_views.RolesStore),
    path('roles/all', roles_views.RolesIndex),
    path('roles/view/<int:pk>', roles_views.RolesShow),
    path('roles/change/<int:pk>', roles_views.RolesUpdate),
    path('roles/delete/<int:pk>', roles_views.RolesDelete),

    path('users/add', users_views.UsersStore),
    path('users/all', users_views.UsersIndex),
    path('users/view/<int:pk>', users_views.UsersShow),
    path('users/change/<int:pk>', users_views.UsersUpdate),
    path('users/delete/<int:pk>', users_views.UsersDelete),

    path('permissions/add', permissions_views.PermissionsStore),
    path('permissions/all', permissions_views.PermissionsIndex),
    path('permissions/view/<int:pk>', permissions_views.PermissionsShow),
    path('permissions/change/<int:pk>', permissions_views.PermissionsUpdate),
    path('permissions/delete/<int:pk>', permissions_views.PermissionsDelete),
]