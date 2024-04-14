import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart'
import Product from 'App/Models/Product'
import CartProduct from 'App/Models/CartProduct'
import StoreCartValidator from 'App/Validators/StoreCartValidator'
import UpdateCartValidator from 'App/Validators/UpdateCartValidator'


export default class CartsController {
  
  /**
   * @index
   * @paramQuery page - Page - @type(number)
   * @paramQuery limit - Nbre d'elements par page - @type(number)
   * @paramQuery user_id - User Id - @type(number)
   */
  public async index({request}: HttpContextContract) {
    const page = request.input('page') ?? 1
    const limit = request.input('limit') ?? 2
    const user_id = request.input('user_id') ?? null

    let carts:Cart[] = []
    if (user_id) {
      carts = await Cart.query()
                            .preload('products')
                            .where('user_id', user_id)
                            .orderBy('created_at', 'desc').paginate(page, limit)
    } else {
      carts = await Cart.query()
                            .preload('products')
                            .orderBy('created_at', 'desc').paginate(page, limit)
    }
    
    
    return carts
  }

  /**
   * @show
   * @paramPath id - Cart id - @type(number)
   */
  public async show({params}: HttpContextContract) {
    const cart = await Cart.query()
                        .preload('products')
                        .where('id', params.id)
                        .firstOrFail();
    return cart
  }

  /**
   * @store
   * @requestBody {"user_id": 0, "products":[{"id":0, "quantity":0, "discount_percentage":0}]}
   */
  public async store({request}: HttpContextContract) {
    const payload = await request.validate(StoreCartValidator)
    let total = 0
    let discounted_total = 0
    let total_products = 0
    let total_quantity = 0
    
    const cart = await Cart.create({
        user_id: payload.user_id,
        total: 0,
        discounted_total: 0,
        total_products: 0,
        total_quantity: 0,
    })

    const cartProducts: CartProduct[] = []

    for (const item of payload.products) {        
        const product = await Product.findOrFail(item.id)
        const totalItem = product.price * item.quantity
        const discount_percentage = item.discount_percentage ?? 0
        const discounted_price = product.price * (1 - discount_percentage / 100) * item.quantity

        total += totalItem
        discounted_total += discounted_price
        total_products += 1
        total_quantity += item.quantity

        const cartProduct = await CartProduct.create({
          cart_id: cart.id, 
          product_id: product.id,
          price: product.price,
          quantity: item.quantity,
          total: totalItem,
          discounted_price: discounted_price,
          discount_percentage: discount_percentage,
        })
        cartProducts.push(cartProduct)
    }

    cart.merge({
        total: total,
        discounted_total: discounted_total,
        total_products: total_products,
        total_quantity: total_quantity,
    })  
    
    await cart.related('products').saveMany(cartProducts)

    await cart.save()

    return cart
  }


  /**
   * @update
   * @paramPath id - Cart id - @type(number)
   * @requestBody {"user_id": 0, "products":[{"id":0, "quantity":0, "discount_percentage":0}]}
   */
  public async update({params, request}: HttpContextContract) {
    const payload = await request.validate(UpdateCartValidator)
    const cart = await Cart.findOrFail(params.id)
    let total = 0
    let discounted_total = 0
    let total_products = 0
    let total_quantity = 0
    
    // Remove existing Cart Products
    const existingCartProducts = await cart.related('products').query()
    for (const cproduct of existingCartProducts) {
        await cproduct.delete()
    }

    const cartProducts: CartProduct[] = []
    for (const item of payload.products) {        
        const product = await Product.findOrFail(item.id)
        const totalItem = product.price * item.quantity
        const discount_percentage = item.discount_percentage ?? 0
        const discounted_price = product.price * (1 - discount_percentage / 100) * item.quantity

        total += totalItem
        discounted_total += discounted_price
        total_products += 1
        total_quantity += item.quantity

        const cartProduct = await CartProduct.create({
          cart_id: cart.id, 
          product_id: product.id,
          quantity: item.quantity,
          total: totalItem,
          discounted_price: discounted_price,
          discount_percentage: discount_percentage,
        })
        cartProducts.push(cartProduct)
    }

    cart.merge({
        total: total,
        discounted_total: discounted_total,
        total_products: total_products,
        total_quantity: total_quantity,
    })  
    
    await cart.related('products').saveMany(cartProducts)

    await cart.save()

    return cart
  }

  /**
   * @destroy
   * @paramPath id - Cart id - @type(number)
   */
  public async destroy({params, response}: HttpContextContract) {
    const cart = await Cart.findOrFail(params.id)
    const existingCartProducts = await cart.related('products').query()
    for (const cproduct of existingCartProducts) {
        await cproduct.delete()
    }
    await cart.delete()
    return response.status(200).json({message: 'Cart deleted !!'})
  }
}
