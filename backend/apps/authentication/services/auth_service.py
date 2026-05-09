from apps.authentication.models import User

def create_user(*, email, password):
    return User.objects.create_user(
        email=email,
        password=password,
    )
