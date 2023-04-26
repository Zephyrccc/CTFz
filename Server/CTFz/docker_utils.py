import docker

def remove_docker_container(container_id: str):
    client = docker.DockerClient(
        base_url='unix://var/run/docker.sock', version='auto', timeout=1000)
    try:
        container = client.containers.get(container_id)
    except docker.errors.NotFound:
        # 未找到容器,关闭客户端，并返回false
        client.close()
        return False
    container.stop(timeout=0)
    client.close()
    return True

def add_docker_container(image_name: str, container_port: int, uuid: str, flag: str, cpu_limit: int or float, memory_limit: str):
    # 创建 Docker 客户端
    client = docker.DockerClient(base_url='unix://var/run/docker.sock', version='auto', timeout=1000)
    container = client.containers.run(
        image=image_name,
        name=uuid,
        environment={'FLAG': flag},
        nano_cpus=int(cpu_limit * 1e9),
        mem_limit=memory_limit,
        ports={f'{container_port}/tcp': None},
        auto_remove=True,
        detach=True,
    )
    container.reload()
    host_port = container.attrs['NetworkSettings']['Ports'][f'{container_port}/tcp'][0]['HostPort']
    container_id = container.id
    client.close()
    print("创建容器完成")
    return host_port, container_id
