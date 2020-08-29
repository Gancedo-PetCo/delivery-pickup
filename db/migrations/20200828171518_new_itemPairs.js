
exports.up = function (knex) {
  return knex.schema

    .createTable('stores', function (table) {
      table.increments('id').primary();
      table.integer('store_id');
      table.string('store_name').notNullable();
      table.string('store_address').notNullable();
      table.string('store_phone_number').notNullable();
    })
    .createTable('items', function (table) {
      table.increments('id').primary();
      table.integer('item_id').notNullable();
    })
    .createTable('availability', function (table) {
      table.increments('id').primary();
      table.integer('item_id').notNullable();
      table.integer('store_id').notNullable();
      table.boolean('availability');

      table.foreign('item_id').references('id').inTable('items');
      table.foreign('store_id').references('id').inTable('stores');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable('availability').dropTable('stores').dropTable('items');
};