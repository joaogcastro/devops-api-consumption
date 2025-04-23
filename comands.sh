#!/bin/bash
set -e

# Verifica se a rede já existe, se não, cria uma nova
if ! docker network ls | grep -q "voo_network"; then
    echo "Criando a rede 'voo_network'..."
    docker network create voo_network
else
    echo "A rede 'voo_network' já existe."
fi

# Construindo e executando o servidor
echo "Construindo a imagem do servidor..."
cd server
docker build -t voo_server .

echo "Iniciando o contêiner do servidor..."
docker run -d --name project_server --network voo_network -p 3000:3000 voo_server

# Retorna ao diretório raiz
cd ..

# Construindo e executando o cliente
echo "Construindo a imagem do cliente..."
cd client
docker build -t voo_client .

echo "Iniciando o contêiner do cliente..."
docker run -d --name project_client --network voo_network -p 4000:4000 voo_client

# Construindo e executando o Regis
docker run -d -p 6000:6379 --name=voo_redis redis

# Construindo e executando o Mysql
docker run -d --name voo_mysql \
  -e MYSQL_ROOT_PASSWORD=voo123 \
  -e MYSQL_DATABASE=voos \
  -p 3308:3306 \
  -e MYSQL_USER=voo \
  -e MYSQL_PASSWORD=voo123 \
  mysql:8.0

echo "Ambiente configurado com sucesso!"