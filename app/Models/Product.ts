import { DateTime } from 'luxon'
import { BaseModel, column, 
  BelongsTo, belongsTo,
  hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import ProductImage from './ProductImage'
import CartProduct from './CartProduct'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public title: string
  
  @column()
  public description: string
  
  @column()
  public brand: string
  
  @column()
  public price: number
  
  @column()
  public discount_percentage: number
  
  @column()
  public rating: number
  
  @column()
  public stock: number
  
  @column()
  public category_id: number
  
  @column()
  public thumbnail: string
  
  @hasMany(() => CartProduct, {
    foreignKey: 'product_id',
  })
  public carts: HasMany<typeof CartProduct>

  @hasMany(() => ProductImage, {
    foreignKey: 'product_id',
  })
  public images: HasMany<typeof ProductImage>

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  public category: BelongsTo<typeof Category>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
