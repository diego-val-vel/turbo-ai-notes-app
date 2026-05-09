from django.contrib.auth import authenticate
from rest_framework import serializers
from apps.authentication.models import User

from apps.authentication.selectors.user_selectors import (
    get_user_by_email,
)

class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    def validate_email(self, value):
        existing_user = get_user_by_email(
            email=value,
        )

        if existing_user:
            raise serializers.ValidationError(
                "User with this email already exists.",
            )

        return value

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            username=email,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid credentials.",
            )

        attrs["user"] = user

        return attrs

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = (
            "id",
            "email",
            "created_at",
        )
