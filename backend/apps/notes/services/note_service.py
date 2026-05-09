from apps.notes.models import Note

def create_note(
    *,
    user,
    category,
):
    return Note.objects.create(
        user=user,
        category=category,
    )

def update_note(
    *,
    note,
    title,
    content,
    category,
):
    note.title = title
    note.content = content
    note.category = category

    note.save()

    return note
