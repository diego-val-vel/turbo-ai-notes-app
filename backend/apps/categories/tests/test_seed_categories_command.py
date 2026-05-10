from io import StringIO
from django.core.management import call_command
from django.test import TestCase
from apps.categories.models import Category

class SeedCategoriesCommandTests(TestCase):
    def test_seed_categories_creates_default_categories(self):
        out = StringIO()

        call_command(
            "seed_categories",
            stdout=out,
        )

        self.assertEqual(
            Category.objects.count(),
            3,
        )

        self.assertTrue(
            Category.objects.filter(
                name=Category.Names.RANDOM_THOUGHTS,
            ).exists()
        )

        self.assertTrue(
            Category.objects.filter(
                name=Category.Names.SCHOOL,
            ).exists()
        )

        self.assertTrue(
            Category.objects.filter(
                name=Category.Names.PERSONAL,
            ).exists()
        )

    def test_seed_categories_is_idempotent(self):
        call_command("seed_categories")
        call_command("seed_categories")

        self.assertEqual(
            Category.objects.count(),
            3,
        )
