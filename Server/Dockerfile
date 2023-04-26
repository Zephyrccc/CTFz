FROM docker:23.0.4
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk update
RUN apk add --virtual build-deps gcc python3-dev musl-dev
RUN apk add --no-cache mariadb-dev curl py3-pip python3 vim net-tools ca-certificates tzdata
RUN mkdir -p /var/www/html/Server
COPY requirements.txt /var/www/html/Server
COPY ./start.sh /var/www/html/Server
WORKDIR /var/www/html/Server
RUN chmod +x start.sh
RUN python3 -m pip install --upgrade pip -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
RUN pip3 install -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple --trusted-host mirrors.aliyun.com
RUN apk del build-deps gcc python3-dev musl-dev
CMD [ "/var/www/html/Server/start.sh"]
EXPOSE 8000