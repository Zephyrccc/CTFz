
from .models import DockerContainer
from .docker_utils import remove_docker_container
from .utils import result_record


def remove_container(container_id: str):
    container = DockerContainer.objects.get(container_id=container_id)
    if container.status:
        # 解题记录
        result_record(user=container.user, challenge=container.challenge)
        # 更新容器状态
        container.status = False
        container.save()
        # 删除容器
        remove_docker_container(container_id)
