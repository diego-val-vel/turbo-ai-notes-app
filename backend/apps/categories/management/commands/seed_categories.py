from django.core.management.base import BaseCommand
from apps.categories.models import Category

class Command(BaseCommand):
    help = "Seed default note categories."

    DEFAULT_CATEGORIES = [
        {
            "name": Category.Names.RANDOM_THOUGHTS,
            "color": "#FFC6A8",
        },
        {
            "name": Category.Names.SCHOOL,
            "color": "#FFE28A",
        },
        {
            "name": Category.Names.PERSONAL,
            "color": "#B8E8D4",
        },
    ]

    def handle(self, *args, **options):
        created_count = 0
        updated_count = 0

        for category_data in self.DEFAULT_CATEGORIES:
            _, created = Category.objects.update_or_create(
                name=category_data["name"],
                defaults={
                    "color": category_data["color"],
                },
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded categories. Created: {created_count}. Updated: {updated_count}."
            )
        )
