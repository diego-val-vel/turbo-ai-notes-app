from rest_framework import generics
from rest_framework import response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from apps.categories.models import Category

from apps.notes.serializers import (
    CreateNoteSerializer,
    NoteSerializer,
    UpdateNoteSerializer,
)

from apps.notes.selectors.note_selectors import (
    get_user_note_by_id,
    get_user_notes,
)

from apps.notes.services.note_service import (
    create_note,
    update_note,
)

class NoteListAPIView(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return get_user_notes(
            user=self.request.user,
        )

class NoteCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CreateNoteSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        category = Category.objects.get(
            id=serializer.validated_data["category_id"],
        )

        note = create_note(
            user=request.user,
            category=category,
        )

        return response.Response(
            NoteSerializer(note).data,
            status=status.HTTP_201_CREATED,
        )

class NoteDetailAPIView(generics.RetrieveAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_user_note_by_id(
            user=self.request.user,
            note_id=self.kwargs["note_id"],
        )

class NoteUpdateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, note_id):
        serializer = UpdateNoteSerializer(
            data=request.data,
            partial=True,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        note = get_user_note_by_id(
            user=request.user,
            note_id=note_id,
        )

        category = None

        if "category_id" in serializer.validated_data:
            category = Category.objects.get(
                id=serializer.validated_data["category_id"],
            )

        updated_note = update_note(
            note=note,
            title=serializer.validated_data.get(
                "title",
                note.title,
            ),
            content=serializer.validated_data.get(
                "content",
                note.content,
            ),
            category=category or note.category,
        )

        return response.Response(
            NoteSerializer(updated_note).data,
            status=status.HTTP_200_OK,
        )
