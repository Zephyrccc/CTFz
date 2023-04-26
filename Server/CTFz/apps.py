from django.apps import AppConfig


class CtfzConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CTFz'

    def ready(self):
        from .scheduler import scheduler
        scheduler.start()
