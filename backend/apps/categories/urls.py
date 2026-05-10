from django.urls import path
from apps.categories.views import CategoryListAPIView

app_name = "categories"

urlpatterns = [
    path(
        "",
        CategoryListAPIView.as_view(),
        name="list",
    ),
]
