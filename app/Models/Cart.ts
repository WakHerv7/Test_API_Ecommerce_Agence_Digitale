import { DateTime } from 'luxon'
import { BaseModel, column, 
  BelongsTo, belongsTo,
  HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import CartProduct from './CartProduct'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public total: number
  
  @column()
  public discounted_total: number
  
  @column()
  public user_id: number
  
  @column()
  public total_products: number
  
  @column()
  public total_quantity: number
  
  @hasMany(() => CartProduct, {
    foreignKey: 'cart_id',
  })
  public products: HasMany<typeof CartProduct>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
