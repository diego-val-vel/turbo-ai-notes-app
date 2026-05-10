from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from apps.authentication.models import User

class SignupAPIViewTests(APITestCase):
    def test_signup_creates_user_and_returns_tokens(self):
        response = self.client.post(
            reverse("authentication:signup"),
            {
                "email": "test@example.com",
                "password": "strongpassword123",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_201_CREATED,
        )

        self.assertTrue(
            User.objects.filter(
                email="test@example.com",
            ).exists()
        )

        self.assertIn("user", response.data)
        self.assertIn("tokens", response.data)
        self.assertIn(
            "access",
            response.data["tokens"],
        )
        self.assertIn(
            "refresh",
            response.data["tokens"],
        )

    def test_signup_fails_when_email_already_exists(self):
        User.objects.create_user(
            email="test@example.com",
            password="password123",
        )

        response = self.client.post(
            reverse("authentication:signup"),
            {
                "email": "test@example.com",
                "password": "strongpassword123",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )


class LoginAPIViewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="strongpassword123",
        )

    def test_login_returns_tokens_for_valid_credentials(self):
        response = self.client.post(
            reverse("authentication:login"),
            {
                "email": "test@example.com",
                "password": "strongpassword123",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_200_OK,
        )

        self.assertIn("user", response.data)
        self.assertIn("tokens", response.data)

    def test_login_fails_for_invalid_credentials(self):
        response = self.client.post(
            reverse("authentication:login"),
            {
                "email": "test@example.com",
                "password": "wrongpassword",
            },
            format="json",
        )

        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST,
        )
