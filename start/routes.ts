/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';
import AutoSwagger from "adonis-autoswagger";
import swagger from "../config/swagger"
// returns swagger in YAML
Route.get("/swagger", async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get("/docs", async () => {
  return AutoSwagger.ui("/swagger", swagger);
});


Route.group(() => {

  Route.post("/auth/register", 'AuthController.register')
  Route.post("/auth/login", 'AuthController.login')

  Route.resource('/products', 'ProductsController').apiOnly().middleware({ '*': 'auth' })
  Route.resource('/carts', 'CartsController').apiOnly().middleware({ '*': 'auth' })
  Route.resource('/categories', 'CategoriesController').apiOnly().middleware({ '*': 'auth' })

  Route.get('/users', 'UsersController.index').middleware('auth')

  Route.get('/users/:id', 'UsersController.show').middleware('auth')

}).prefix('/api')



Route.get('/', async () => {
  return "Api Test Ecommerce"
})
