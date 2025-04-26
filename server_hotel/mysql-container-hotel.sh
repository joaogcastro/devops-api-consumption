docker run -d \
  --name mysql-hotel \
  -e MYSQL_ROOT_PASSWORD=rootpassword \
  -e MYSQL_DATABASE=hoteis \
  -e MYSQL_USER=hotel \
  -e MYSQL_PASSWORD=hotel123 \
  -p 3310:3306 \
  mysql:8.0 \
  --default-authentication-plugin=mysql_native_password
