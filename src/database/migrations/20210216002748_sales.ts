import * as Knex from "knex";




export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sales', (table) => {
    table.increments('id').primary();
    table.decimal('value', 18, 2).notNullable();

    table.integer('payment_category_id')
    table.foreign('payment_category_id')
      .references('id')
      .inTable('payment_category');

    table.integer('user_id')
    table.foreign('user_id')
      .references('id')
      .inTable('users');

    table.boolean('active').defaultTo(true);
    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sales');
}
