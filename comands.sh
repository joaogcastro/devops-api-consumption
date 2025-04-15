#!/bin/bash
docker network create voo_network

cd server
docker build -t voo_server .
docker run -d --name project_server --network voo_network -p 3000:3000 voo_server

cd ..
cd client
docker build -t voo_client .
docker run -d --name project_client --network voo_network -p 4000:4000 voo_client
