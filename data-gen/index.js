const faker = require('faker');
const fs = require('fs');
const PATH = require('path');

const writeItems = fs.createWriteStream(PATH.join(__dirname, '/csv/items.csv'));
const writeStore = fs.createWriteStream(PATH.join(__dirname, '/csv/stores.csv'));
const writeAvail = fs.createWriteStream(PATH.join(__dirname, '/csv/availability.csv'));
const startIdx = 100;
const maxStores = 5;
const maxItems = 10000000;
const encoding = 'utf-8';

writeItems.write('item_id\n', 'utf8');
writeStore.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');
writeAvail.write('item_id,store_id,availability\n', 'utf8');



const itemMaker = (id) => {
  return [`${id + startIdx}\n`];
};

//only going to have 5 stores to simulate 1 user searching item availability in a 50mi radius
//there are only 1500 petco stores in the whole US
const storeMaker = (id) => {
  const storeName = faker.address.city();
  const storeAddress = faker.address.streetAddress();
  const storePhone = faker.phone.phoneNumberFormat();

  return [`${id},"${storeName}","${storeAddress}","${storePhone}"\n`];
};



const availabilityMaker = (id) => {
  let data = [];

  for (let i = 1; i <= maxStores; i++) {
    let inStock = Math.random() < 0.7;
    let entry = `${id},${i},${inStock}\n`;
    data.push(entry);
  }

  return data;
};


/**
 * Generates data entries into a csv file
 * @param {*} writer write stream function to named file
 * @param {*} numEntries number of entries to generate
 * @param {*} dataMaker function that should output data in the form of an array
 * @param {*} encoding
 * @param {*} CB callback function used to end write stream
 */
const dataWriter = (writer, numEntries, dataMaker, encoding, callback) => {
  let i = numEntries;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;

      const data = dataMaker(id);
      for (let j = 0; j < data.length; j++) {
        if (i === 0 && j === data.length - 1) {
          writer.write(data[j], encoding, callback);
        } else {
          // see if we should continue, or wait
          // don't pass the callback, because we're not done yet.
          ok = writer.write(data[j], encoding);
        }
      }

    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      writer.once('drain', write);
    }
  };
  write();
};


dataWriter(writeItems, maxItems, itemMaker, encoding, () => {
  writeStore.end();
});
dataWriter(writeStore, maxStores, storeMaker, encoding, () => {
  writeStore.end();
});
dataWriter(writeAvail, maxItems, availabilityMaker, encoding, () => {
  writeStore.end();
});