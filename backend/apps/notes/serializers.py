from rest_framework import serializers
from apps.categories.models import Category
from apps.notes.models import Note

class NoteSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.get_name_display",
        read_only=True,
    )

    category_color = serializers.CharField(
        source="category.color",
        read_only=True,
    )

    class Meta:
        model = Note

        fields = (
            "id",
            "title",
            "content",
            "category",
            "category_name",
            "category_color",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

class CreateNoteSerializer(serializers.Serializer):
    category_id = serializers.UUIDField()

    def validate_category_id(self, value):
        if not Category.objects.filter(
            id=value,
        ).exists():
            raise serializers.ValidationError(
                "Category does not exist.",
            )

        return value

class UpdateNoteSerializer(serializers.Serializer):
    title = serializers.CharField(
        allow_blank=True,
    )

    content = serializers.CharField(
        allow_blank=True,
    )

    category_id = serializers.UUIDField()

    def validate_category_id(self, value):
        if not Category.objects.filter(
            id=value,
        ).exists():
            raise serializers.ValidationError(
                "Category does not exist.",
            )

        return value
