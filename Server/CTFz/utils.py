from django.db.models import F
from datetime import datetime, timedelta
from .scheduler import scheduler
from .models import User, Challenge, SolveRecord, FailRecord, DockerContainer
from .docker_utils import remove_docker_container


def add_task(func, time: int, args: list, id: str):
    start_time = datetime.now() + timedelta(seconds=time)
    scheduler.add_job(func=func, trigger='date', run_date=start_time,
                      args=args, id=id, replace_existing=True)


def delete_task(task_id: str):
    scheduler.remove_job(task_id)


def challenge_record(user: User, challenge: Challenge, result: bool):
    if result:
        record = SolveRecord.objects.filter(
            user=user, challenge=challenge).first()
        if not record:
            SolveRecord.objects.create(user=user, challenge=challenge)
            user.total_score = F('total_score') + challenge.score
            user.save()
    else:
        FailRecord.objects.create(user=user, challenge=challenge)


def delete_container(container: DockerContainer):
    remove_docker_container(container.container_id)
    if container.status:
        container.status = False
        container.save()


def result_record(user: User, challenge: Challenge,):
    record = SolveRecord.objects.filter(user=user, challenge=challenge).first()
    if not record:
        challenge_record(user, challenge, False)
