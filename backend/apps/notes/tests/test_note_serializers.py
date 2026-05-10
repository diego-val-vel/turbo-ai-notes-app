from django.test import TestCase
from apps.categories.models import Category

from apps.notes.serializers import (
    CreateNoteSerializer,
    NoteSerializer,
    UpdateNoteSerializer,
)

from apps.authentication.models import User
from apps.notes.models import Note

class CreateNoteSerializerTests(TestCase):
    def setUp(self):
        self.category = Category.objects.create(
            name="Personal",
            color="#B7D1CF",
        )

    def test_serializer_accepts_valid_category(self):
        serializer = CreateNoteSerializer(
            data={
                "category_id": str(
                    self.category.id,
                ),
            }
        )

        self.assertTrue(serializer.is_valid())

    def test_serializer_rejects_invalid_category(self):
        serializer = CreateNoteSerializer(
            data={
                "category_id": "invalid-uuid",
            }
        )

        self.assertFalse(serializer.is_valid())


class UpdateNoteSerializerTests(TestCase):
    def test_serializer_accepts_partial_update(self):
        serializer = UpdateNoteSerializer(
            data={
                "title": "Updated title",
            },
            partial=True,
        )

        self.assertTrue(serializer.is_valid())


class NoteSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="password123",
        )

        self.category = Category.objects.create(
            name="Personal",
            color="#B7D1CF",
        )

        self.note = Note.objects.create(
            user=self.user,
            category=self.category,
            title="My note",
            content="My content",
        )

    def test_note_serializer_returns_category_object(self):
        serializer = NoteSerializer(
            self.note,
        )

        self.assertEqual(
            serializer.data["category"]["name"],
            "Personal",
        )

        self.assertEqual(
            serializer.data["category"]["color"],
            "#B7D1CF",
        )
