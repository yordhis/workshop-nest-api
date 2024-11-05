# CURSO DE NEST

## TAREA
- Crear y Conectarse a un servicio de postgres usuando **Docker**
- Crear el crud de usuarios
- Crear autenticación con JWT
- Proteger las rutas **Guard**
- Crear el crud de comentarios

# servicio db
## **docker command**
### Contenedor de POSTGRES
~~~
  docker run -d \
        --name postgres-17 \
        -e POSTGRES_PASSWORD=24823972 \
        -e POSTGRES_USER=root \
        -e POSTGRES_DB=nestjs -p 5432:5432 \
        postgres
~~~

### Contenedor de PGADMIN4 cliente de postgres
~~~
  docker run -p 5050:80 -e "PGADMIN_DEFAULT_EMAIL=user@domain.com" -e "PGADMIN_DEFAULT_PASSWORD=SuperSecret" -d dpage/pgadmin4
~~~