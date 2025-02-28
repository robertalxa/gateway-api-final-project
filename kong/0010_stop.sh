#!/bin/bash

echo "Parando o Kong API Gateway e o banco de dados..."

# Para os containers do Kong e do Postgres
docker stop kong kong-database

# Remove os containers
docker rm kong kong-database

# Remove a rede kong-net (se não estiver em uso)
docker network rm kong-net

echo "Kong, banco de dados e rede foram removidos com sucesso!"
