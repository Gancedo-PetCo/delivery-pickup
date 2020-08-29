const fs = require('fs');
const PATH = require('path');
const { copyToTable } = require('../copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('availability').del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(PATH.resolve(__dirname, '..', '..', 'data-gen', 'csv', 'availability.csv'));
        try {
          await copyToTable(tx, 'availability', ['item_id', 'store_id', 'availability'], fileStream);
        } catch (e) {
          console.error(e);
        }
      });
    });
};
