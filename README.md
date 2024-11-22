# API - Servicio para un emoccerce simple 📋
## Objetivos del proyecto 📝
- Construir un backend utilizando:<br>
      - NestJs: como framework de desarrollo.<br>
      - TypeORM: como herramienta de mapeo relacional de objetos<br>
      - Postgresql: como sistema gestor de base de datos<br>
      - Cloudinary: como servicio de almacenamiento de imágenes en la nube.<br>
      - Swagger: para documentar y consumir la API<br>
- Practicar y afianzar nuevas tecnologías aprendidas
- Aplicar mejores prácticas de programación
## Descripción ✏
La idea es crear una aplicación en donde los usuarios puedean registrarse y realizar las operaciones típicas en un ecommerce:<br>
- Autenticación de usuario.
- Geestión de datos del usuario registrado (solo los usuarios adeministradores pueden eliminar un usuario)
- Gestión de órdenes de compra por parte del usuario
- Gestión de productos y categorías de los mismos (solo usuarios administradores)
- Consulta de productos disponibles
- No incluye pasalera de pago

## API Endpoints ✔

### Autenticación:
- POST - /auth/signup
      - Permite registrar un usuario
- POST - /auth/signin
      - Permite loguear al usuario
      - Retorna un token

### Categorias de productos:
- POST - /categories/seeder
      - Crea un conjunto de categorías iniciales
- POST - /categories
      - Crea una categoría específica
      - Reqiere autenticación (token)
      - Requiere rol de 'Admin'
- GET - /categories
      - Retorna un JSON con el listado de categorías disponibles
      - No requiere autenticación (token)

### Files
- POST - /files/:productId
       - Permite asignar una imágen a un producto
       - Requiere autenticación (token)
       - Requiere rol de 'Admin'

### Orders
- POST - /orders
       - Permite generar una orden de compra
       - Requere auntenticación (token)
- GET - /orders/:id
       - Permite ver una orden generada por el usuario
       - Requere auntenticación (token)

### Products
- GET - /products
      - Retorna un JSON con todos los productos y su categoría
      - No requiere autenticación (token)
- GET - /products/seeder
      - Crea un conjunto de productos iniciales
      - No requiere autenticación (token)
- GET - /products/:id
      - Retorna un JSON con la información específica de un producto
      - No requiere autenticación (token)
- POST - /products
       - Crea un producto en la base de datos
       - Requiere autenticación (token)
       - Requiere rol de 'Admin'
- PUT - /products/:id
      - Permite editar los datos de un producto existente en la base de datos
      - Requiere autenticación (token)
      - Requiere rol de 'Admin'
- DELETE - /products/:id
      - Elimina un producto existente en la base de datos
      - Requiere autenticación (token)
      - Requiere rol de 'Admin'

### Users
- GET - /users
      - Retorna un JSON con todos los usuarios y sus órdenes de compra
      - Requiere autenticación (token)
      - Requiere rol de 'Admin'
- GET - /users/:id
      - Retorna los datos de un usuario en específico
      - Requiere autenticación (token)
      - Requiere rol de 'User'
- PUT - /users/:id
      - Permite modificar los datos del usuario logueado
      - Requiere autenticación (token)
      - Requiere rol de 'User'
- DELETE - /users/:id
      - Elimina un usuario existente en la base de datos
      - Requiere autenticación (token)
      - Requiere rol de 'Admin'
Nota:
Cuando se crea un usuario, por defecto este se crea con el rol de `User`.

## Boiler Plate ✔
Se deberá contar con un archivo `.env.development` con la siguiente estructura:
```
DB_NAME=ecommerce-demo-db
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_KEY=

JWT_SECRET=
```
Reemplazar los datos con sus propias credenciales.

### Base de datos ✔
Antes de correr el proyecto, deberá crear una base de datos en Postgresql llamada `ecommerce-demo-db`.

### Correr el proyecto ✔
```
npm run start:dev
```
Antes de comenzar con las pruebas correr los siguientes `endpoint´s` en el orden que se indica a continuación
- http://localhost:3000/categories/seeder
- http://localhost:3000/products/seeder

## Tecnologías utilizadas 💻
- NestJs
- TypeORM
- Postgresql
- Cloudinary
- Swagger
- Bcrypt
- UUID
