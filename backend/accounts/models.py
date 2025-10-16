from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(max_length=15, blank=True, null=True)
    role = models.CharField(max_length=15)

    def __str__(self):
        return self.username
