from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from .views import (LoginView, UserViewSet, ChallengeViewSet,
                    CategoryViewSet, SolveRecordViewSet,
                    FailRecordViewSet, ChallengeCommentViewSet,
                    TeamViewSet, TagViewSet, TeamApplicationViewSet,
                    ChangePasswordAPIview, TeamMemberAPIView,
                    DockerContainerViewSet, FlagAPIView, HostViewSet
                    )
urlpatterns = [
    path('users/token/refresh/', TokenRefreshView.as_view()),
    path('users/token/verify/', TokenVerifyView.as_view()),
    path('users/<int:pk>/password/', ChangePasswordAPIview.as_view()),
    path('teams/members/<int:pk>/', TeamMemberAPIView.as_view()),
    path('users/login/', LoginView.as_view()),
    path('flag/', FlagAPIView.as_view()),
]

router = SimpleRouter()
router.register('host', HostViewSet, basename='host')
router.register('users', UserViewSet, basename='users')
router.register('teams/applications', TeamApplicationViewSet,
                basename='teams/applications')
router.register('teams', TeamViewSet, basename='teams')
router.register('challenges/categorys', CategoryViewSet,
                basename='challenges/categorys')
router.register('challenges/solves', SolveRecordViewSet,
                basename='challenges/solves')
router.register('challenges/fails', FailRecordViewSet,
                basename='challenges/fails')
router.register('challenges/comments', ChallengeCommentViewSet,
                basename='challenges/comments')
router.register('challenges/tags', TagViewSet, basename='challenges/tags')
router.register('challenges', ChallengeViewSet, basename='challenges')
router.register('docker', DockerContainerViewSet, basename='docker')

# print(router.urls)
urlpatterns += router.urls
