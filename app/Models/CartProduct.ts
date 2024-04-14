import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Cart from './Cart'
import Product from './Product'

export default class CartProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cart_id: number
  
  @column()
  public product_id: number

  @column()
  public price: number

  @column()
  public quantity: number
  
  @column()
  public total: number
  
  @column()
  public discount_percentage: number
  
  @column()
  public discounted_price: number

  @belongsTo(() => Cart, {
    foreignKey: 'cart_id',
  })
  public cart: BelongsTo<typeof Cart>

  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  public product: BelongsTo<typeof Product>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
