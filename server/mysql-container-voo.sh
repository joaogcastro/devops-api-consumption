docker run -d \
  --name mysql-voo \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=voos \
  -e MYSQL_USER=voo \
  -e MYSQL_PASSWORD=voo123 \
  -p 3308:3306 \
  mysql:8.0
