from rest_framework import serializers
from apps.categories.models import Category

class CategorySerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(
        source="get_name_display",
        read_only=True,
    )

    class Meta:
        model = Category

        fields = (
            "id",
            "name",
            "display_name",
            "color",
        )
