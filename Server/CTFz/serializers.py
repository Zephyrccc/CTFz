from django.conf import settings
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import (User, Team, Tag, Category, Challenge, SolveRecord,
                     FailRecord, TeamApplication, ChallengeComment,
                     DockerContainer, Host)


class LoginSerializer(TokenObtainPairSerializer):
    """
    登录序列化
    """

    def validate(self, attrs):
        super().validate(attrs)
        refresh = self.get_token(self.user)
        return {'code': 200, 'access_token': str(refresh.access_token), 'refresh_token': str(refresh), 'id': self.user.pk}


class RegisterSerializer(serializers.ModelSerializer):
    """
    注册序列化
    """
    class Meta:
        model = User
        fields = ['username', 'password']
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        username = validated_data["username"]
        password = validated_data["password"]
        user = User(username=username)
        user.set_password(password)
        user.save()
        return user

# 单独改密码
# user.set_password(validated_data['password'])
# user.save()


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class UserSerializer(serializers.ModelSerializer):

    solve_record = serializers.SerializerMethodField(
        method_name='getSolveRecord', read_only=True)

    def getSolveRecord(self, obj):
        reslut = []
        for item in obj.u_solve_record.values():
            reslut.append(item)
        return reslut

    class Meta:
        model = User
        fields = ['id', 'username', 'describe',
                  'total_score', 'team', 'solve_record']
        depth = 1
        extra_kwargs = {
            'id': {'read_only': True},
            'username': {'read_only': True},
            'total_score': {'read_only': True},
            'team': {'read_only': True},
            'solve_record': {'read_only': True},
        }


class TeamSerializer(serializers.ModelSerializer):
    captain = UserSerializer()
    member = UserSerializer(many=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'captain', 'declare',
                  'describe', 'member', 'created_time']
        extra_kwargs = {
            'id': {'read_only': True},
            'name': {'read_only': True},
            'captain': {'read_only': True},
            'member': {'read_only': True},
            'created_time': {'read_only': True},
        }


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'value']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ChallengeSerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)
    category = CategorySerializer()
    attachment = serializers.SerializerMethodField()

    def get_attachment(self, obj):
        if obj.attachment:
            return obj.attachment.url.replace(settings.MEDIA_ROOT, '/')
        else:
            return None

    class Meta:
        model = Challenge
        fields = ['id', 'title', 'environment_type', 'category', 'tag',
                  'describe', 'score', 'difficulty', 'attachment', 'created_time']


class SolveRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    challenge = ChallengeSerializer()

    class Meta:
        model = SolveRecord
        fields = ['id', 'user', 'challenge', 'created_time']


class FailRecordSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    challenge = ChallengeSerializer()

    class Meta:
        model = FailRecord
        fields = ['id', 'user', 'challenge', 'created_time']


class ChallengeCommentSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(label='id', read_only=True)
    # user = serializers.PrimaryKeyRelatedField(
    #     label='用户', queryset=User.objects.all())
    # challenge = serializers.PrimaryKeyRelatedField(
    #     label='团队', queryset=Challenge.objects.all())
    user = UserSerializer()
    challenge = ChallengeSerializer()

    class Meta:
        model = ChallengeComment
        fields = ['id', 'user', 'challenge', 'content', 'time']


class AddChallengeCommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        label='用户', queryset=User.objects.all())
    challenge = serializers.PrimaryKeyRelatedField(
        label='团队', queryset=Challenge.objects.all())
    content = serializers.CharField(label='内容')

    class Meta:
        model = ChallengeComment
        fields = ['user', 'challenge', 'content']


class TeamApplicationSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    team = TeamSerializer()

    class Meta:
        model = TeamApplication
        fields = ['id', 'user', 'team', 'status', 'time']
        extra_kwargs = {
            'id': {'read_only': True},
            'user': {'read_only': True},
            'team': {'read_only': True},
            'time': {'read_only': True},
            'status': {'write_only': True}
        }


class ApplicationTeamRequestSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        label='用户', queryset=User.objects.all())
    team = serializers.PrimaryKeyRelatedField(
        label='团队', queryset=Team.objects.all())

    class Meta:
        model = TeamApplication
        fields = ['user', 'team']


class CreateTeamSerializer(serializers.ModelSerializer):
    captain = serializers.PrimaryKeyRelatedField(
        label='队长', queryset=User.objects.all())

    def validate_captain(self, value):
        if value.team != None:
            raise serializers.ValidationError("该用户已有团队")
        return value

    class Meta:
        model = Team
        fields = ['name', 'captain', 'declare', 'describe']


class DockerContainerSerializer(serializers.Serializer):

    class Meta:
        model = DockerContainer
        fields = ['id', 'user', 'challenge',
                  'port', 'time_limit', 'created_time']


class AddDockerContainerSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(
        label='用户', queryset=User.objects.all())
    challenge = serializers.PrimaryKeyRelatedField(
        label='题目', queryset=Challenge.objects.all())

    class Meta:
        model = DockerContainer
        fields = ['user', 'challenge']


class DockerContainerSerializer(serializers.Serializer):
    id = serializers.IntegerField(label='id', read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        label='用户', queryset=User.objects.all())
    challenge = serializers.PrimaryKeyRelatedField(
        label='题目', queryset=Challenge.objects.all())
    port = serializers.IntegerField(label='端口', read_only=True)
    time_limit = serializers.IntegerField(label='时间限制', read_only=True)
    created_time = serializers.DateTimeField(label='创建时间', read_only=True)


class FlagSerializer(serializers.Serializer):
    flag = serializers.CharField(label='flag')
    user = serializers.PrimaryKeyRelatedField(
        label='用户', queryset=User.objects.all())
    challenge = serializers.PrimaryKeyRelatedField(
        label='题目', queryset=Challenge.objects.all())


class HostSerializer(serializers.Serializer):
    name = serializers.CharField(label='name')
