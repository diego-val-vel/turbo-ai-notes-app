from rest_framework import serializers
from apps.categories.models import Category
from apps.notes.models import Note

class NoteSerializer(serializers.ModelSerializer):
    category = serializers.SerializerMethodField()

    def get_category(self, obj):
        return {
            "id": str(obj.category.id),
            "name": obj.category.get_name_display(),
            "color": obj.category.color,
        }

    class Meta:
        model = Note

        fields = (
            "id",
            "title",
            "content",
            "category",
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
