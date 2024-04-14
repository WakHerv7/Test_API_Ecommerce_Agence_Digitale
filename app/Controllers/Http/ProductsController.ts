import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductImage from 'App/Models/ProductImage'
import StoreProductValidator from 'App/Validators/StoreProductValidator'
import UpdateProductValidator from 'App/Validators/UpdateProductValidator'
import Drive from '@ioc:Adonis/Core/Drive'

export default class ProductsController {
  
  /**
   * @index
   * @paramQuery page - Page - @type(number)
   * @paramQuery limit - Nbre d'elements par page - @type(number)
   */
  public async index({request}: HttpContextContract) {
    const page = request.input('page') ?? 1
    const limit = request.input('limit') ?? 2
    const products = await Product.query()
                                  .preload('images', (u) => u.select('name'))
                                  .preload('category', (u) => u.select('name'))
                                  .orderBy('created_at', 'desc')
                                  .paginate(page, limit)
    
    return products
  }

  /**
   * @show
   * @paramPath id - Product id - @type(number)
   */
  public async show({params}: HttpContextContract) {
    const product = await Product.query()
                        .preload('images')
                        .preload('category', (u) => u.select('name'))
                        .where('id', params.id)
                        .firstOrFail();
    return product
  }

  /**
   * @store   
   * @requestFormDataBody {"title":{"type":"string"}, "description":{"type":"string"}, "brand":{"type":"string"}, "category":{"type":"number"}, "price":{"type":"number"}, "discount_percentage":{"type":"number"}, "rating":{"type":"number"}, "stock":{"type":"number"}, "thumbnail":{"type":"file"}, "image1":{"type":"file"}, "image2":{"type":"file"}}
   */
  public async store({request}: HttpContextContract) {
    const payload = await request.validate(StoreProductValidator)
    await payload.thumbnail.moveToDisk('./thumbnailsProduits')
    const thumbnailName = payload.thumbnail.fileName
    const product = await Product.create({
      title: payload.title,
      description: payload.description ?? '',
      brand: payload.brand ?? '',
      price: payload.price ?? 0,
      discount_percentage: payload.discount_percentage ?? 0,
      rating: payload.rating ?? 0,
      stock: payload.stock ?? 0,
      category_id: payload.category,
      thumbnail: thumbnailName,
    })
    const images: ProductImage[] = []
    if (payload.images) {
      payload.images.map(async (image) => {
        await image.moveToDisk('./imagesProduits')
        const imageName = image.fileName
        const imageProduct = await ProductImage.create({
          name: imageName,
          product_id: product.id
        })
        images.push(imageProduct)
      })
    } else {
      if(payload.image1){
        await payload.image1.moveToDisk('./imagesProduits')
        const imageName = payload.image1.fileName
        const imageProduct = await ProductImage.create({
          name: imageName,
          product_id: product.id
        })
        images.push(imageProduct)
      }
      if(payload.image2){
        await payload.image2.moveToDisk('./imagesProduits')
        const imageName = payload.image2.fileName
        const imageProduct = await ProductImage.create({
          name: imageName,
          product_id: product.id
        })
        images.push(imageProduct)
      }
    }
        
    await product.related('images').saveMany(images)

    return product
  }

  /**
   * @update
   * @paramPath id - Product id - @type(number)
   * @requestFormDataBody {"title":{"type":"string"}, "description":{"type":"string"}, "brand":{"type":"string"}, "category":{"type":"number"}, "price":{"type":"number"}, "discount_percentage":{"type":"number"}, "rating":{"type":"number"}, "stock":{"type":"number"}, "thumbnail":{"type":"file"}, "image1":{"type":"file"}, "image2":{"type":"file"}}
   */
  public async update({params, request}: HttpContextContract) {
    const payload = await request.validate(UpdateProductValidator)
    const product = await Product.findOrFail(params.id)
    
    let thumbnailName:any
    if (payload.thumbnail) {
      await Drive.delete(product.thumbnail)
      await payload.thumbnail.moveToDisk('./thumbnailsProduits')
      thumbnailName = payload.thumbnail.fileName
    }

    const updatedProduct = product.merge({
      title: payload.title ?? product.title,
      description: payload.description ?? product.description,
      brand: payload.brand ?? product.brand,
      price: payload.price ?? product.price,
      discount_percentage: payload.discount_percentage ?? product.discount_percentage,
      rating: payload.rating ?? product.rating,
      stock: payload.stock ?? product.stock,
      category_id: payload.category ?? product.category_id,
      thumbnail: thumbnailName ?? product.thumbnail,
    })
    
    if (payload.images || payload.image1 || payload.image2) {
      // Delete existing images
      const existingImages = await product.related('images').query()
      for (const image of existingImages) {
          await Drive.delete(`./imagesProduits/${image.name}`)
      }      
      // Add new images
      const images: ProductImage[] = []
      if (payload.images) {
        payload.images.map(async (image) => {
          await image.moveToDisk('./imagesProduits')
          const imageName = image.fileName
          const imageProduct = await ProductImage.create({
            name: imageName,
            product_id: product.id
          })
          images.push(imageProduct)
        })
      } else {
        if(payload.image1){
          await payload.image1.moveToDisk('./imagesProduits')
          const imageName = payload.image1.fileName
          const imageProduct = await ProductImage.create({
            name: imageName,
            product_id: product.id
          })
          images.push(imageProduct)
        }
        if(payload.image2){
          await payload.image2.moveToDisk('./imagesProduits')
          const imageName = payload.image2.fileName
          const imageProduct = await ProductImage.create({
            name: imageName,
            product_id: product.id
          })
          images.push(imageProduct)
        }
      }

      await updatedProduct.related('images').saveMany(images)
   }
    
    await updatedProduct.save()
    
    return updatedProduct
  }


  /**
   * @destroy
   * @paramPath id - Product id - @type(number)
   */
  public async destroy({params, response}: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    await Drive.delete(`./imagesProduits/${product.thumbnail}`)

    const existingImages = await product.related('images').query()
    for (const image of existingImages) {
        await Drive.delete(`./imagesProduits/${image.name}`)
    }

    await product.delete()

    return response.status(200).json({message: 'Product deleted !!'})
  }

}
