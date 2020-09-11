const knex = require('./knex.js');

exports.getData = async (param) => {
  return await knex('items')
    .select(
      'items.item_id',
      'store_name',
      'store_address',
      'store_phone_number',
      'availability.availability'
    )
    .innerJoin(
      'availability',
      'items.id',
      '=',
      'availability.item_id'
    )
    .innerJoin(
      'stores',
      'stores.id',
      (builder) => {
        builder
          .select(
            'id'
          )
          .from(
            'stores'
          )
          .where(
            'stores.id',
            '=',
            knex.ref('availability.store_id')
          )
      }
    )
    .where(
      'items.item_id', `${parseInt(param)}`
    );
};
