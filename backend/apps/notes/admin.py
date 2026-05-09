from django.contrib import admin
from apps.notes.models import Note

@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "category",
        "updated_at",
    )

    search_fields = (
        "title",
        "content",
        "user__email",
    )

    list_filter = (
        "category",
        "created_at",
        "updated_at",
    )

    ordering = (
        "-updated_at",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
    )
