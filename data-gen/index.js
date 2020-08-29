const fs = require('fs');
const PATH = require('path');
const { dataWriter, availabilityMaker, storeMaker, itemMaker } = require('./data-gen-functions');

const maxStores = 5;
const maxItems = 10000000;
const encoding = 'utf-8';

//create write streams
const writeItems = fs.createWriteStream(PATH.join(__dirname, '/csv/items.csv'));
const writeStore = fs.createWriteStream(PATH.join(__dirname, '/csv/stores.csv'));
const writeAvail = fs.createWriteStream(PATH.join(__dirname, '/csv/availability.csv'));

//write csv table heads
writeItems.write('item_id\n', 'utf8');
writeStore.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');
writeAvail.write('item_id,store_id,availability\n', 'utf8');

//end write streams
dataWriter(writeItems, maxItems, itemMaker, encoding, () => {
  writeStore.end();
});
dataWriter(writeStore, maxStores, storeMaker, encoding, () => {
  writeStore.end();
});
dataWriter(writeAvail, maxItems, availabilityMaker, encoding, () => {
  writeStore.end();
});



