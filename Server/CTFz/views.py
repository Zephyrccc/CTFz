import uuid
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.viewsets import GenericViewSet, ReadOnlyModelViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin, DestroyModelMixin
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import DefaultPagination
from .models import (User, Team, Challenge, Tag, Category, SolveRecord, FailRecord, ChallengeComment,
                     TeamApplication, DockerContainer, Host)
from .serializers import (LoginSerializer, RegisterSerializer, UserSerializer,
                          TeamSerializer, ChallengeSerializer, TagSerializer,
                          CategorySerializer, SolveRecordSerializer, FailRecordSerializer, ChallengeCommentSerializer,
                          TeamApplicationSerializer, ApplicationTeamRequestSerializer, AddChallengeCommentSerializer,
                          CreateTeamSerializer, ChangePasswordSerializer, DockerContainerSerializer,
                          AddDockerContainerSerializer, FlagSerializer, HostSerializer)
from .filters import (ChallengeFilter, ChallengeCommentFilter, TeamApplicationFilter,
                      ResultRecordFilter, TeamFilter, UserFilter)
from .tasks import remove_container
from .docker_utils import add_docker_container
from .utils import add_task, delete_task, delete_container, result_record, challenge_record
from .permission import IsUserSelf, IsCaptain, CheckCreateTeam, CheckDestroyContainer, IsOwner
from rest_framework.permissions import IsAuthenticated


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class UserViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin, CreateModelMixin):
    queryset = User.objects.all().order_by('-total_score')
    serializer_class = UserSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

    def get_permissions(self):
        if self.request.method == 'POST':
            return []
        elif self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsOwner()]

    # 注册

    def create(self, request: Request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            data = dict()
            data['id'] = user.pk
            data['access'] = str(refresh.access_token)
            data['refresh'] = str(refresh)
            return Response(data=data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class ChangePasswordAPIview(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request: Request, pk: None):
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            user = request.user
            old_password = serializer.data.get("old_password")
            new_password = serializer.data.get("new_password")

            if not user.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TeamViewSet(GenericViewSet, RetrieveModelMixin, ListModelMixin, CreateModelMixin):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = TeamFilter

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), CheckCreateTeam()]
        return [IsAuthenticated()]

    def create(self, request: Request):
        serializer = CreateTeamSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        user = serializer.validated_data['captain']
        user.team = instance
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()


class TeamApplicationViewSet(GenericViewSet, ListModelMixin, CreateModelMixin):
    queryset = TeamApplication.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = TeamApplicationFilter
    serializer_class = TeamApplicationSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return TeamApplication.objects.all().filter(
                user__team__exact=None, status__exact=2, team__captain=self.request.user)
        return TeamApplication.objects.all()

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsUserSelf()]
        return [IsAuthenticated()]

    def create(self, request):
        serializer = ApplicationTeamRequestSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data["user"]
            team = serializer.validated_data["team"]
            application = TeamApplication.objects.filter(
                user=user, team=team).first()
            if application == None and user.team == None:
                serializer.save()
            if application and application.team == team and application.status != 2:
                application.status = 2
                application.save()
            return Response(data={'message': '添加记录成功'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def perform_update(self, serializer):
        instance = self.get_object()
        user = instance.user
        old_status = instance.status
        new_status = serializer.validated_data["status"]
        if old_status == 2:
            instance = serializer.save()
            if new_status == 1 and user.team == None:
                user = instance.user
                user.team = instance.team
                user.save()
            else:
                instance.status = 0
                instance.save()


class ChallengeViewSet(ReadOnlyModelViewSet):
    queryset = Challenge.objects.all().order_by('difficulty')
    serializer_class = ChallengeSerializer
    filterset_class = ChallengeFilter
    pagination_class = DefaultPagination
    ordering_fields = ['difficulty', 'created_time']
    filter_backends = (DjangoFilterBackend, OrderingFilter)


class TagViewSet(GenericViewSet, ListModelMixin):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class CategoryViewSet(GenericViewSet, ListModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SolveRecordViewSet(GenericViewSet, ListModelMixin):
    queryset = SolveRecord.objects.all()
    serializer_class = SolveRecordSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResultRecordFilter
    permission_classes = [IsAuthenticated]


class FailRecordViewSet(GenericViewSet, ListModelMixin):
    queryset = FailRecord.objects.all()
    serializer_class = FailRecordSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ResultRecordFilter
    permission_classes = [IsAuthenticated]


class ChallengeCommentViewSet(GenericViewSet, ListModelMixin, CreateModelMixin):
    queryset = ChallengeComment.objects.all().order_by('-time')
    serializer_class = ChallengeCommentSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ChallengeCommentFilter

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated(), IsUserSelf()]
        return [IsAuthenticated()]

    def create(self, request: Request):
        serializer = AddChallengeCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id = serializer.data.get("user")
        challenge_id = serializer.data.get("challenge")
        content = serializer.data.get("content")
        user = User.objects.filter(id=user_id).first()
        challenge = Challenge.objects.filter(id=challenge_id).first()
        comment = ChallengeComment.objects.create(
            user=user, challenge=challenge, content=content)
        serializer = ChallengeCommentSerializer(comment)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)


class TeamMemberAPIView(APIView):
    permission_classes = [IsAuthenticated, IsCaptain]

    # 移除成员
    def delete(self, request: Request, pk):
        user = User.objects.get(id=pk)
        user.team = None
        user.save()
        return Response(data={'message': '踢出队员成功'}, status=status.HTTP_202_ACCEPTED)

    # 转移队长
    def patch(self, request: Request, pk):
        user = User.objects.get(id=pk)
        user.team.captain = user
        user.team.save()
        return Response(data={'message': '转移队长成功'}, status=status.HTTP_202_ACCEPTED)


class DockerContainerViewSet(GenericViewSet, CreateModelMixin, DestroyModelMixin, ListModelMixin):
    queryset = DockerContainer.objects.all().filter(status=True)
    serializer_class = DockerContainerSerializer

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAuthenticated(), CheckDestroyContainer()]
        return [IsAuthenticated()]

    # 开启容器

    def create(self, request):
        serializer = AddDockerContainerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id = serializer.data.get("user")
        challenge_id = serializer.data.get("challenge")
        user = User.objects.get(id=user_id)
        challenge = Challenge.objects.get(id=challenge_id)
        if (challenge.environment_type and challenge.docker_config):
            # 查询是否开启了多个容器，只能允许同时开启一个容器
            old_container = DockerContainer.objects.filter(
                user=user, status=True).first()
            if old_container:
                delete_task(old_container.container_id)
                delete_container(old_container)
                result_record(old_container.user, old_container.challenge)
            # 读取容器配置
            _image_name = challenge.docker_config.image_name
            _container_port = challenge.docker_config.container_port
            _uuid = str(uuid.uuid4())
            _flag = "flag{"+_uuid+"}"
            _cpu_limit = challenge.docker_config.cpu_limit
            _memory_limit = challenge.docker_config.memory_limit
            _time_limit = challenge.docker_config.time_limit
            _host_port, _container_id = add_docker_container(
                _image_name, _container_port, _uuid, _flag, _cpu_limit, _memory_limit)
            container = DockerContainer.objects.create(
                container_id=_container_id, user=user, challenge=challenge, flag=_flag, port=_host_port, time_limit=_time_limit)
            _task_id = _container_id
            add_task(remove_container, _time_limit, [_container_id], _task_id)
            serializer = DockerContainerSerializer(container)
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_201_CREATED)

    # 关闭容器
    def destroy(self, request: Request, pk=None):
        instance = self.get_object()
        if instance.status:
            delete_task(instance.container_id)
            delete_container(instance)
            result_record(instance.user, instance.challenge)
        return Response(status=status.HTTP_204_NO_CONTENT)

    # 获取自己开启的容器信息
    def list(self, request: Request):
        user = request.user
        queryset = DockerContainer.objects.filter(
            user=user, status=True).first()
        if queryset:
            serializer = self.get_serializer(queryset)
            return Response(serializer.data)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FlagAPIView(APIView):
    permission_classes = [IsAuthenticated, IsUserSelf]

    def post(self, request: Request):
        serializer = FlagSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_id = serializer.data.get("user")
        challenge_id = serializer.data.get("challenge")
        submit_flag = serializer.data.get("flag")
        challenge = Challenge.objects.filter(id=challenge_id).first()
        if challenge.environment_type:
            container = DockerContainer.objects.filter(
                user=user_id, challenge=challenge_id, status=True).first()
            if container:
                flag = container.flag
                if (submit_flag == flag):
                    challenge_record(container.user, container.challenge, True)
                    return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            flag = challenge.flag
            if (submit_flag == flag):
                user = User.objects.filter(id=user_id).first()
                challenge_record(user, challenge, True)
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class HostViewSet(GenericViewSet, RetrieveModelMixin):
    queryset = Host.objects.all()
    serializer_class = HostSerializer
