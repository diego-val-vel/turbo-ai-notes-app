from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.authentication.models import User
from apps.categories.models import Category

class CategoryListAPIViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="password123",
        )

        self.category_1 = Category.objects.create(
            name="Personal",
            color="#B7D1CF",
        )

        self.category_2 = Category.objects.create(
            name="School",
            color="#E2D8F9",
        )

        self.client.force_authenticate(
            user=self.user,
        )

    def test_list_categories_returns_categories(self):
        response = self.client.get(
            reverse("categories:list"),
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertEqual(
            len(response.data),
            2,
        )

    def test_category_response_contains_expected_fields(self):
        response = self.client.get(
            reverse("categories:list"),
        )

        category = response.data[0]

        self.assertIn("id", category)
        self.assertIn("name", category)
        self.assertIn("color", category)
