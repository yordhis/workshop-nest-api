# NEST


# servicio db
docker command
~~~
  docker run -d \
        --name postgres-17 \
        -e POSTGRES_PASSWORD=24823972 \
        -e POSTGRES_USER=root \
        -e POSTGRES_DB=nestjs -p 5432:5432 \
        postgres

~~~