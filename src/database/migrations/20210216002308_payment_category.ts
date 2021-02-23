import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('payment_category', (table) => {
    table.increments('id').primary();
    table.string('description', 150).notNullable();
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();

    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('payment_category');
}
