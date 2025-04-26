# Commands
# docker build -t server-hotel .
# docker run --network host server-hotel

FROM python:3.12-slim

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir flask mysql-connector-python redis

EXPOSE 5000

CMD ["python", "server_api.py"]
