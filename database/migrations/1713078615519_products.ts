import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('brand').nullable()
      table.integer('price').defaultTo(0)
      table.integer('discount_percentage').defaultTo(0)
      table.integer('rating').defaultTo(0)
      table.integer('stock').defaultTo(0)     
      table.integer('category_id').unsigned().references('categories.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('thumbnail').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
