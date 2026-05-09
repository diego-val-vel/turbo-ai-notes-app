import uuid

from django.db import models
from apps.authentication.models import User
from apps.categories.models import Category

class Note(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="notes",
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="notes",
    )

    title = models.CharField(
        max_length=255,
        blank=True,
        default="",
    )

    content = models.TextField(
        blank=True,
        default="",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "notes"
        ordering = ["-updated_at"]

    def __str__(self):
        return self.title or "Untitled Note"
