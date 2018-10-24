# TOC API Demo

## Descripción
Proyecto construído en [Node](https://nodejs.org/en/) utilizando el Framework [ExpressJS](http://expressjs.com/) y ORM [Sequelize](http://docs.sequelizejs.com/). Permite levantar una **API RESTful** para gestionar la base de datos MySQL utilizada en la *Workshop Angular*

## Descripción Técnica

* NodeJS: v8.9.1
* ExpressJS: v4.16.0
* Sequelize: v4.37.5

## Instalación
1. Clonar el proyecto
2. Ingresar a la carpeta del proyecto y ejecutar ```npm install```
3. En el archivo de configuración ```config.json``` editar el atributo *development* con los datos de conexión a la base de datos.
4. Ejecutar la siguiente query en la base de datos:
```sql
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `given_name` varchar(255) DEFAULT NULL,
  `family_name` varchar(255) DEFAULT NULL,
  `auth0_id` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
3. Ejecutar ```node ./bin/www```
4. (Opcional). En el caso de tener problemas de ejecución del servidor ejecutar ```chmod +x ./bin/www```.

## Endpoints
Para ver los endpoints disponibles recomendamos la instalación de [Insomnia REST Client](https://insomnia.rest). Importar el archivo ```proyecto_insomnia.json```.