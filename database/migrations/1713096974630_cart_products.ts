import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cart_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('cart_id').unsigned().references('carts.id')
      table.integer('product_id').unsigned().references('products.id')
      table.integer('price').defaultTo(0)
      table.integer('quantity').defaultTo(0)
      table.integer('total').defaultTo(0)
      table.integer('discount_percentage').defaultTo(0)
      table.integer('discounted_price').defaultTo(0)
      table.unique(['cart_id', 'product_id'])
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
