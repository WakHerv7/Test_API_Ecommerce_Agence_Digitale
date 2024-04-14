import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import StoreCategoryValidator from 'App/Validators/StoreCategoryValidator'
import UpdateCategoryValidator from 'App/Validators/UpdateCategoryValidator'
import Drive from '@ioc:Adonis/Core/Drive'

export default class CategoriesController {
  /**
   * @index
   * @paramQuery page - Page - @type(number)
   * @paramQuery limit - Nbre d'elements par page - @type(number)
   */
  public async index({request}: HttpContextContract) {
    const page = request.input('page') ?? 1
    const limit = request.input('limit') ?? 2
    const categories = await Category.query()
                                      .orderBy('created_at', 'desc')
                                      .paginate(page, limit)
    
    return categories
  }

  /**
   * @show
   * @paramPath id - Category id - @type(number)
   */
  public async show({params}: HttpContextContract) {
    const category = await Category.query()
                        .where('id', params.id)
                        .firstOrFail();
    return category
  }

  /**
   * @store
   * @requestFormDataBody {"name":{"type":"string"},"image":{"type":"file"}}
   */
  public async store({request}: HttpContextContract) {
    const payload = await request.validate(StoreCategoryValidator)
    await payload.image.moveToDisk('./categories')
    const imageName = payload.image.fileName
    const category = await Category.create({
      name: payload.name,
      image: imageName,
    })
    return category
  }

  /**
   * @update
   * @paramPath id - Category id - @type(number)
   * @requestFormDataBody {"name":{"type":"string"},"image":{"type":"file"}}
   */
  public async update({params, request}: HttpContextContract) {
    const payload = await request.validate(UpdateCategoryValidator)
    const category = await Category.findOrFail(params.id)
    
    let imageName:any
    if (payload.image) {
      await Drive.delete(`./categories/${category.image}`)
      await payload.image.moveToDisk('./categories')
      imageName = payload.image.fileName
    }

    const updatedCategory = await category.merge({
      name: payload.name ?? category.name,
      image: imageName ?? category.image,
    }).save()
    
    return updatedCategory
  }

  /**
   * @destroy
   * @paramPath id - Category id - @type(number)
   */
  public async destroy({params, response}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await Drive.delete(`./categories/${category.image}`)
    await category.delete()

    return response.status(200).json({message: 'Category deleted !!'})
  }
}
