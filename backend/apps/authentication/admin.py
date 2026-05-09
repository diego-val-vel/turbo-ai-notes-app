from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from apps.authentication.models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("created_at",)

    list_display = (
        "email",
        "is_staff",
        "is_active",
        "created_at",
    )

    search_fields = (
        "email",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "last_login",
    )

    fieldsets = (
        (
            "General Information",
            {
                "fields": (
                    "id",
                    "email",
                    "password",
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        (
            "Audit",
            {
                "fields": (
                    "last_login",
                    "created_at",
                    "updated_at",
                ),
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
