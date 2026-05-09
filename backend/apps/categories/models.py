import uuid
from django.db import models

class Category(models.Model):
    class Names(models.TextChoices):
        RANDOM_THOUGHTS = "RANDOM_THOUGHTS", "Random Thoughts"
        SCHOOL = "SCHOOL", "School"
        PERSONAL = "PERSONAL", "Personal"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )

    name = models.CharField(
        max_length=64,
        choices=Names.choices,
        unique=True,
    )

    color = models.CharField(
        max_length=32,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        db_table = "categories"
        ordering = ["name"]

    def __str__(self):
        return self.get_name_display()
