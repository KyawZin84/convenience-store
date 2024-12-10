from email.policy import default
from django.db import models
from datetime import datetime
from my_store import enums
from django.utils import timezone
# Create your models here.
class CategoriesModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    description = models.TextField(default=None)
    status = models.CharField(choices=enums.CATEGORIES_STATUS,max_length=100,default='deactivate')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.name

class FilesModel(models.Model):
    id = models.AutoField(primary_key=True)
    file = models.FileField(default=None)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return self.file

class ItemsModel(models.Model):
    id = models.AutoField(primary_key=True)
    categories = models.ForeignKey(CategoriesModel, on_delete=models.CASCADE)
    files = models.ForeignKey(FilesModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    purchase_price = models.IntegerField()
    price = models.IntegerField(default=None)
    qty = models.IntegerField(default=None)
    barcode = models.IntegerField(default=None)
    status = models.CharField(choices=enums.ITEMS_STATUS,max_length=50,default='deactivate')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.barcode)
    
class OrderModel(models.Model):
    id = models.AutoField(primary_key=True)
    status = models.CharField(choices=enums.ORDER_STATUS,max_length=50,default='deactivate')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.id)
    
class Order_ItemsModel(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.ForeignKey(OrderModel, on_delete=models.CASCADE)
    items = models.ForeignKey(ItemsModel, on_delete=models.CASCADE)
    qty = models.IntegerField(default=None)
    total = models.IntegerField(default=None)
    profix = models.IntegerField(default=None)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.total)
    
class ShopModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    address = models.TextField()
    phone = models.IntegerField(default=None)
    open = models.DateTimeField(default=datetime.now())
    close = models.DateTimeField(default=datetime.now())
    status = models.CharField(choices=enums.SHOP_STATUS,max_length=50,default='deactivate')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.name)

class InvoicesModel(models.Model):
    id = models.AutoField(primary_key=True)
    order = models.JSONField();
    shop = models.ForeignKey(ShopModel, on_delete=models.CASCADE)
    total_qty = models.IntegerField(default=None)
    subtotal = models.IntegerField(default=None)
    tax = models.IntegerField(default=None)
    discount = models.IntegerField(default=None)
    credit = models.IntegerField(default=None)
    total_amount = models.IntegerField(default=None)
    is_delivery= models.IntegerField(default=None)
    charge = models.IntegerField(default=None)
    refund = models.IntegerField(default=None)
    status = models.CharField(choices=enums.SHOP_STATUS,max_length=50,default='deactivate')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.id)
    
class RolesModel(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.name)

class UsersModel(models.Model):
    id = models.AutoField(primary_key=True)
    role_id = models.ForeignKey(RolesModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    date_of_birth = models.DateTimeField(default=timezone.now() - timezone.timedelta(days=365.25 * 18))
    nrc_number = models.CharField(max_length=30, default= '##/A B C(C)/######')
    address = models.TextField()
    phone = models.CharField(max_length=15, help_text="Enter phone number in the format: 09 123 456 789", default= '09 123 456 789')
    email = models.EmailField(default='username@gmail.com')
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.name)

class PermissionsModel(models.Model):
    id = models.AutoField(primary_key=True)
    role_id = models.ForeignKey(RolesModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(default=datetime.now())

    def __str__(self):
        return str(self.name)