from django.urls import path

from apps.authentication.views import (
    LoginAPIView,
    LogoutAPIView,
    MeAPIView,
    SignupAPIView,
)

app_name = "authentication"

urlpatterns = [
    path(
        "signup/",
        SignupAPIView.as_view(),
        name="signup",
    ),

    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),

    path(
        "logout/",
        LogoutAPIView.as_view(),
        name="logout",
    ),

    path(
        "me/",
        MeAPIView.as_view(),
        name="me",
    ),
]
