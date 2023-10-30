import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('todo', (table) => {
    table.increments('id').primary();
    table.string('description');
    table.boolean('completed').defaultTo(false);
    table.integer('userid');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('todo');
}
