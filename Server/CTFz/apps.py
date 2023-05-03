from django.apps import AppConfig
from django.db.models.signals import post_migrate


class CtfzConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'CTFz'

    def ready(self):
        from .scheduler import scheduler
        scheduler.start()
        post_migrate.connect(self.create_init_data, sender=self)

    def create_init_data(self, sender, **kwargs):
        # 初始数据创建
        from .models import User, Category
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin')
        if not Category.objects.filter(name='All').exists():
            Category.objects.create(name='All')
        if not Category.objects.filter(name='Web').exists():
            Category.objects.create(name='Web')
        if not Category.objects.filter(name='Pwn').exists():
            Category.objects.create(name='Pwn')
        if not Category.objects.filter(name='Reverse').exists():
            Category.objects.create(name='Reverse')
        if not Category.objects.filter(name='Crypto').exists():
            Category.objects.create(name='Crypto')
        if not Category.objects.filter(name='Misc').exists():
            Category.objects.create(name='Misc')
        if not Category.objects.filter(name='Other').exists():
            Category.objects.create(name='Other')
