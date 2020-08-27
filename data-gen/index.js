const faker = require('faker');
const fs = require('fs');

const writeStore = fs.createWriteStream('stores.csv');
const writeItem = fs.createWriteStream('availability.csv');

writeStore.write('storeId,storeName,storeAddress,storePhone\n', 'utf8');
writeStore.write('itemId,storeId,inStock\n', 'utf8');

const writeOneHundredStores = (writer, encoding, CB) => {
  let i = 100;
  let id = 0;
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const storeName = faker.address.city();
      const storeAddress = faker.address.streetAddress();
      const storePhone = faker.phone.phoneNphoneNumberFormatumber();
      const data = `${id},${storeName},${storeAddress},${storePhone}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
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

const writeTenMillionItems = () => {

};