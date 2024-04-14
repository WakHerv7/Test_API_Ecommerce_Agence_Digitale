import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  
  /**
   * @index
   * @paramQuery page - Page - @type(number)
   * @paramQuery limit - Nbre d'elements par page - @type(number)
   */
  public async index({request}: HttpContextContract) {
    const page = request.input('page') ?? 1
    const limit = request.input('limit') ?? 2
    const users = await User.query()
                            .preload('carts', (cartsQuery) => {
                                cartsQuery.preload('products')
                            })
                            .orderBy('created_at', 'desc')
                            .paginate(page, limit)
    return users
  }

  
  /**
   * @show
   * @paramPath id - User id - @type(number)
   */
  public async show({params}: HttpContextContract) {
    const product = await User.query()
                        .preload('carts', (cartsQuery) => {
                            cartsQuery.preload('products')
                        })
                        .where('id', params.id)
                        .firstOrFail();
    return product
  }

}
