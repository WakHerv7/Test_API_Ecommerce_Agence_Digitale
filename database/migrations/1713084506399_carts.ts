import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Carts extends BaseSchema {
  protected tableName = 'carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('total').notNullable()
      table.integer('discounted_total').notNullable()      
      table.integer('user_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
      table.integer('total_products').notNullable()
      table.integer('total_quantity').notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
