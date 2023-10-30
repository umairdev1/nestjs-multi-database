import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
