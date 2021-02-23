import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 150).notNullable();
    table.string('role', 150).notNullable();
    table.string('email', 150).unique().notNullable();
    table.string('password_hash', 255).unique().notNullable();
    table.boolean('active').defaultTo(true);
    table.timestamp('created_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
      .notNullable();

    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  })

}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

