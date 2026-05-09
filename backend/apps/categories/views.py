from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from apps.categories.models import Category
from apps.categories.serializers import CategorySerializer

class CategoryListAPIView(generics.ListAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    queryset = Category.objects.all()
