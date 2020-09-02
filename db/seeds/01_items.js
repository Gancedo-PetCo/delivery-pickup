const fs = require('fs');
const PATH = require('path');
const { copyToTable } = require('../copyToTable.js');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return knex.transaction(async (tx) => {
        const fileStream = fs.createReadStream(PATH.resolve(__dirname, '..', '..', 'data-gen', 'csv', 'items.csv'));
        try {
          await copyToTable(tx, 'items', ['item_id'], fileStream);
        } catch (e) {
          console.error(e);
        }
      });
    });
};
