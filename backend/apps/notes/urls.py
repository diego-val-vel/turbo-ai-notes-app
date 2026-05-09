from django.urls import path

from apps.notes.views import (
    NoteCreateAPIView,
    NoteDetailAPIView,
    NoteListAPIView,
    NoteUpdateAPIView,
)

urlpatterns = [
    path(
        "",
        NoteListAPIView.as_view(),
        name="note-list",
    ),

    path(
        "create/",
        NoteCreateAPIView.as_view(),
        name="note-create",
    ),

    path(
        "<uuid:note_id>/",
        NoteDetailAPIView.as_view(),
        name="note-detail",
    ),

    path(
        "<uuid:note_id>/update/",
        NoteUpdateAPIView.as_view(),
        name="note-update",
    ),
]
