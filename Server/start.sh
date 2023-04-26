#!/bin/sh
python3 manage.py migrate && \
python3 manage.py loaddata db/User.json && \
python3 manage.py loaddata db/Challenge.json && \
python3 manage.py runserver 0.0.0.0:8000;