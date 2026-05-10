from rest_framework.exceptions import ValidationError
from django.test import TestCase
from apps.authentication.models import User

from apps.authentication.serializers import (
    SignupSerializer,
    LoginSerializer,
)

class SignupSerializerTests(TestCase):
    def test_validate_email_rejects_existing_user(self):
        User.objects.create_user(
            email="existing@example.com",
            password="password123",
        )

        serializer = SignupSerializer(
            data={
                "email": "existing@example.com",
                "password": "strongpassword123",
            }
        )

        self.assertFalse(serializer.is_valid())

        self.assertIn(
            "email",
            serializer.errors,
        )

    def test_signup_serializer_valid_data(self):
        serializer = SignupSerializer(
            data={
                "email": "new@example.com",
                "password": "strongpassword123",
            }
        )

        self.assertTrue(serializer.is_valid())


class LoginSerializerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            password="strongpassword123",
        )

    def test_login_serializer_accepts_valid_credentials(self):
        serializer = LoginSerializer(
            data={
                "email": "test@example.com",
                "password": "strongpassword123",
            }
        )

        self.assertTrue(serializer.is_valid())

    def test_login_serializer_rejects_invalid_credentials(self):
        serializer = LoginSerializer(
            data={
                "email": "test@example.com",
                "password": "wrongpassword",
            }
        )

        self.assertFalse(serializer.is_valid())

        self.assertIn(
            "non_field_errors",
            serializer.errors,
        )
