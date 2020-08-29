const faker = require('faker');
const startIdx = 100;
const maxStores = 5;


//returns array of size 1
const itemMaker = (id) => {
  return [`${id + startIdx - 1}\n`];
};

//only going to have 5 stores to simulate 1 user searching item availability in a 50mi radius
//there are only 1500 petco stores in the whole US
/**
 *
 * @param {*} id for store
 * returns array of size 1 with the store_id, store_name, store_address, and store_phone
 */
const storeMaker = (id) => {
  const storeName = faker.address.city();
  const storeAddress = faker.address.streetAddress();
  const storePhone = faker.phone.phoneNumberFormat();

  return [`${id},"${storeName}","${storeAddress}","${storePhone}"\n`];
};

//id starts from 1 for both store and items
/**
 *
 * @param {*} id for item
 * returns array of size 1 with the item_id, store_id, and availability(bool)
 */
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


exports.dataWriter = dataWriter;
exports.availabilityMaker = availabilityMaker;
exports.storeMaker = storeMaker;
exports.itemMaker = itemMaker;
