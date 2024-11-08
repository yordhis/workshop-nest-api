# Ejercicio 
## Implementación de la autorización basado en reclamaciones
Este tipo de autorización consiste en lo que puede hacer el usuario y no lo que és;
por lo tanto se debe configurar un enum con todos los permisos y darle uso con un paquete
denominado **CASL**

### Tarea:
- Los administradores pueden administrar (crear/leer/sudar/dirigir/difundir) todas las entidades
- Los usuarios tienen acceso solo para leer a todo
- Los usuarios pueden actualizar sus artículos (article.authorId === userId)
- Los artículos que ya se publican no pueden ser eliminados (article.isPublished === true)