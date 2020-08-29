const fs = require('fs');
const PATH = require('path');
const { copyToTable } = require('../copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('stores').del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(PATH.resolve(__dirname, '..', '..', 'data-gen', 'csv', 'stores.csv'));
        try {
          await copyToTable(tx, 'stores', ['store_id', 'store_name', 'store_address', 'store_phone_number'], fileStream);
        } catch (e) {
          console.error(e);
        }
      });
    });
};
