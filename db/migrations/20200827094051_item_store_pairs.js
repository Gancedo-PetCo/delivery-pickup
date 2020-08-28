
exports.up = function (knex) {
  return knex.schema
    .createTable('availability', function (table) {
      table.increments('id').primary();
      table.integer('itemId').notNullable();
      table.integer('storeId').notNullable();
      table.boolean('availability');

      table.foreign('itemId').references('itemId').inTable('items');
      table.foreign('storeId').references('storeId').inTable('stores');
    })
    .createTable('stores', function (table) {
      table.integer('storeId').primary();
      table.string('storeName').notNullable();
      table.string('storeAddress').notNullable();
      table.string('storePhoneNumber').notNullable();
    })
    .createTable('items', function (table) {
      table.integer('itemId').primary();
    });
};

exports.down = function (knex) {

};
