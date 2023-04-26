from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import MaxValueValidator, MinValueValidator


class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not username:
            raise ValueError('Users must have an username')

        user = self.model(
            username=username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(username, password=password)
        user.is_superuser = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    BOOLEAN_CHOICES = ((True, '正常'), (False, '封禁'))
    username = models.CharField(max_length=30, unique=True, verbose_name='用户名')
    describe = models.CharField(
        max_length=254, default='这家伙很懒什么也没留下...', verbose_name='个人介绍')
    total_score = models.PositiveIntegerField(default=0, verbose_name='总分')
    team = models.ForeignKey(to='CTFz.Team', null=True, blank=True, related_name='member',
                             on_delete=models.CASCADE, db_constraint=False, verbose_name='团队')
    is_active = models.BooleanField(
        choices=BOOLEAN_CHOICES, default=True, verbose_name='账号状态')
    is_admin = models.BooleanField(default=False, verbose_name='是否是管理员')

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their username address
        return self.username

    def get_short_name(self):
        # The user is identified by their username address
        return self.username

    def __str__(self):              # __unicode__ on Python 2
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    class Meta:
        db_table = "ctfz_user"
        verbose_name = "用户"
        verbose_name_plural = verbose_name

        def __str__(self):
            return self.username


class Team(models.Model):
    name = models.CharField(max_length=32, unique=True, verbose_name='名称')
    captain = models.OneToOneField(to="CTFz.User", on_delete=models.CASCADE,
                                   related_name='captain_team', db_constraint=False, verbose_name='队长')
    declare = models.CharField(max_length=32, blank=True, verbose_name='宣言')
    describe = models.CharField(max_length=256, blank=True, verbose_name='简介')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = "ctfz_team"
        verbose_name = "团队"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=64, verbose_name='分类名')

    class Meta:
        db_table = "ctfz_category"
        verbose_name = "题目分类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class Tag(models.Model):
    value = models.CharField(max_length=64, verbose_name='标签名')

    class Meta:
        db_table = "ctfz_tag"
        verbose_name = "标签分类"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.value


class ChallengeDockerConfig(models.Model):
    challenge = models.OneToOneField(to="CTFz.Challenge", on_delete=models.CASCADE,
                                     related_name='docker_config', null=True, db_constraint=False, verbose_name='容器配置')
    image_name = models.CharField(
        max_length=128, unique=True, help_text='动态环境请设置此项', verbose_name='镜像名')
    container_port = models.PositiveIntegerField(
        default=80, help_text='动态环境请设置此项', verbose_name='容器端口')
    cpu_limit = models.FloatField(
        default=0.5, help_text='动态环境请设置此项', verbose_name='CPU限制')
    memory_limit = models.CharField(
        max_length=64, default='128m', help_text='动态环境请设置此项', verbose_name='内存限制')
    time_limit = models.PositiveIntegerField(
        default=7200, help_text='动态环境请设置此项(单位秒)', verbose_name='时间限制')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = "ctfz_challenge_docker_config"
        verbose_name = "题目容器配置"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.challenge.title


class Challenge(models.Model):
    STATUS_CHOICES = ((True, '开放'), (False, '隐藏'))
    ENVIRONMENT_TYPE_CHOICES = ((True, '动态'), (False, '静态'))
    title = models.CharField(max_length=128, verbose_name='题目名称')
    environment_type = models.BooleanField(
        choices=ENVIRONMENT_TYPE_CHOICES, default=False, verbose_name='环境类型')
    category = models.ForeignKey(
        to='CTFz.Category', on_delete=models.CASCADE, db_constraint=False, verbose_name="题目分类")
    tag = models.ManyToManyField(
        to='CTFz.Tag', blank=True, db_constraint=False, verbose_name='标签')
    describe = models.CharField(max_length=256, blank=True, verbose_name='描述')
    score = models.PositiveIntegerField(default=1, verbose_name='分值')
    difficulty = models.FloatField(default=1.0, validators=[MaxValueValidator(
        5.0), MinValueValidator(0.0)], verbose_name='难度')
    status = models.BooleanField(
        choices=STATUS_CHOICES, default=True, verbose_name='状态')
    flag = models.CharField(max_length=128, blank=True,
                            help_text='若为静态环境请设置此项', verbose_name='固定题目的flag')
    attachment = models.FileField(
        upload_to='attachments/', blank=True, help_text='若有附件请设置此项', verbose_name='附件')
    created_time = models.DateTimeField(
        auto_now_add=True, verbose_name='题目创建时间')

    class Meta:
        db_table = "ctfz_challenge"
        verbose_name = "题目"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class SolveRecord(models.Model):
    user = models.ForeignKey(to='CTFz.User', on_delete=models.CASCADE,
                             related_name='u_solve_record', db_constraint=False, verbose_name='用户')
    challenge = models.ForeignKey(to='CTFz.Challenge', on_delete=models.CASCADE,
                                  related_name='c_solve_record', db_constraint=False, verbose_name='题目')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = "ctfz_solve_record"
        verbose_name = "解题成功记录"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.pk)


class FailRecord(models.Model):
    user = models.ForeignKey(to='CTFz.User', on_delete=models.CASCADE,
                             related_name='u_fail_record', db_constraint=False, verbose_name='用户')
    challenge = models.ForeignKey(to='CTFz.Challenge', on_delete=models.CASCADE,
                                  related_name='c_fail_record', db_constraint=False, verbose_name='题目')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')
    updated_time = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        db_table = "ctfz_fail_record"
        verbose_name = "解题失败记录"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.pk)


class ChallengeComment(models.Model):
    user = models.ForeignKey(to='CTFz.User', on_delete=models.CASCADE,
                             related_name='u_challenge_comment', db_constraint=False, verbose_name='用户')
    challenge = models.ForeignKey(to='CTFz.Challenge', on_delete=models.CASCADE,
                                  related_name='c_challenge_comment', db_constraint=False, verbose_name='题目')
    content = models.CharField(max_length=256, verbose_name='评论')
    time = models.DateTimeField(auto_now_add=True, verbose_name='记录时间')

    class Meta:
        db_table = "ctfz_challenge_comment"
        verbose_name = "题目评论"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.pk)


class TeamApplication(models.Model):
    INTEGE_CHOICES = ((0, '拒绝'), (1, '允许'), (2, '未操作'))
    user = models.ForeignKey(to="CTFz.User", blank=True, on_delete=models.CASCADE,
                             related_name='u_team_application', db_constraint=False, verbose_name='用户')
    team = models.ForeignKey(to="CTFz.Team", blank=True, on_delete=models.CASCADE,
                             related_name='t_team_application', db_constraint=False, verbose_name='团队')
    time = models.DateTimeField(auto_now=True, verbose_name='更新时间')
    status = models.IntegerField(
        choices=INTEGE_CHOICES, default=2, verbose_name='操作状态')

    class Meta:
        db_table = "ctfz_team_application"
        verbose_name = "申请记录"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.pk)


class DockerContainer(models.Model):
    BOOLEAN_CHOICES = ((False, '关闭'), (True, '开启'))
    container_id = models.CharField(max_length=128, verbose_name='容器id')
    user = models.ForeignKey(to='CTFz.User', on_delete=models.CASCADE,
                             related_name='u_docker_container', db_constraint=False, verbose_name='用户')
    challenge = models.ForeignKey(to='CTFz.Challenge', on_delete=models.CASCADE,
                                  related_name='c_docker_container', db_constraint=False, verbose_name='题目')
    flag = models.CharField(max_length=128, verbose_name='flag')
    port = models.PositiveIntegerField(default=0, verbose_name='映射端口')
    time_limit = models.PositiveIntegerField(default=7200, verbose_name='时间限制')
    status = models.BooleanField(
        choices=BOOLEAN_CHOICES, default=True, verbose_name='靶机状态')
    created_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

    class Meta:
        db_table = "ctfz_docker_container"
        verbose_name = "靶机容器"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.challenge.title)


class Host(models.Model):
    name = models.CharField(
        max_length=256, verbose_name='地址', default='http://127.0.0.1')

    class Meta:
        db_table = "ctfz_host"
        verbose_name = "主机地址"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "主机地址"
