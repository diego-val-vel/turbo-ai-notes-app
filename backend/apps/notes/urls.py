from django.urls import path

from apps.notes.views import (
    NoteCreateAPIView,
    NoteDetailAPIView,
    NoteListAPIView,
    NoteUpdateAPIView,
)

app_name = "notes"

urlpatterns = [
    path(
        "",
        NoteListAPIView.as_view(),
        name="list",
    ),

    path(
        "create/",
        NoteCreateAPIView.as_view(),
        name="create",
    ),

    path(
        "<uuid:note_id>/",
        NoteDetailAPIView.as_view(),
        name="detail",
    ),

    path(
        "<uuid:note_id>/update/",
        NoteUpdateAPIView.as_view(),
        name="update",
    ),
]
