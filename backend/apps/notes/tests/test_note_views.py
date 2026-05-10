from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.authentication.models import User
from apps.categories.models import Category
from apps.notes.models import Note

class NoteAPIViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="password123",
        )

        self.other_user = User.objects.create_user(
            email="other@example.com",
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

        self.client.force_authenticate(
            user=self.user,
        )

    def test_list_notes_returns_only_user_notes(self):
        Note.objects.create(
            user=self.other_user,
            category=self.category,
            title="Other note",
            content="Other content",
        )

        response = self.client.get(
            reverse("notes:list"),
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(len(response.data), 1)

        self.assertEqual(
            response.data[0]["title"],
            "My note",
        )

    def test_create_note_creates_note(self):
        response = self.client.post(
            reverse("notes:create"),
            {
                "category_id": str(
                    self.category.id,
                ),
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertEqual(
            Note.objects.filter(
                user=self.user,
            ).count(),
            2,
        )

    def test_get_note_returns_note_for_owner(self):
        response = self.client.get(
            reverse(
                "notes:detail",
                kwargs={
                    "note_id": self.note.id,
                },
            ),
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            response.data["title"],
            "My note",
        )

    def test_user_cannot_access_other_user_note(self):
        other_note = Note.objects.create(
            user=self.other_user,
            category=self.category,
            title="Secret",
            content="Hidden",
        )

        response = self.client.get(
            reverse(
                "notes:detail",
                kwargs={
                    "note_id": other_note.id,
                },
            ),
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_404_NOT_FOUND,
        )

    def test_update_note_updates_fields(self):
        response = self.client.patch(
            reverse(
                "notes:update",
                kwargs={
                    "note_id": self.note.id,
                },
            ),
            {
                "title": "Updated title",
                "content": "Updated content",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.note.refresh_from_db()

        self.assertEqual(
            self.note.title,
            "Updated title",
        )

        self.assertEqual(
            self.note.content,
            "Updated content",
        )
