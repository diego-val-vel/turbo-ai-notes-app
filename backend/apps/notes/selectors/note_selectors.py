from django.shortcuts import get_object_or_404
from apps.notes.models import Note

def get_user_notes(user):
    return (
        Note.objects
        .filter(user=user)
        .select_related("category")
        .order_by("-updated_at")
    )

def get_user_note_by_id(*, user, note_id):
    return get_object_or_404(
        Note.objects.select_related("category"),
        id=note_id,
        user=user,
    )
