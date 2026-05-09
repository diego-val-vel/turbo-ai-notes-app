from rest_framework import generics
from rest_framework import permissions
from rest_framework import response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from apps.authentication.serializers import (
    LoginSerializer,
    SignupSerializer,
    UserSerializer,
)

from apps.authentication.services.auth_service import (
    create_user,
)

def build_auth_response(*, user):
    refresh = RefreshToken.for_user(user)

    return {
        "user": UserSerializer(user).data,
        "tokens": {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
    }

class SignupAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = create_user(
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )

        return response.Response(
            build_auth_response(user=user),
            status=status.HTTP_201_CREATED,
        )

class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(
            data=request.data,
        )

        serializer.is_valid(
            raise_exception=True,
        )

        user = serializer.validated_data["user"]

        return response.Response(
            build_auth_response(user=user),
            status=status.HTTP_200_OK,
        )

class LogoutAPIView(APIView):
    def post(self, request):
        return response.Response(
            status=status.HTTP_204_NO_CONTENT,
        )

class MeAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
