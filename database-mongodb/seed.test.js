const { ItemAvailability, Store } = require('./itemAvailability.js');
const mongoose = require('mongoose');
const insertRecords = require('./insert_records');
const config = require('../config.js');

beforeAll(async () => {
  return await mongoose.connect(config.seedUri, { useNewUrlParser: true })
    .then(() => {
      return ItemAvailability.remove({});
    })
    .then(() => {
      return Store.remove({});
    });
});

afterEach(async () => {
  await mongoose.connection.close();
});

test('insert item availability data', () => {
  let storeIds;
  return insertRecords()
    .then(() => {
      return Store.find({})
        .then(records => {
          expect(records).toHaveLength(5);
          expect(records[0].storeName).toBe('N Walnut Creek');
          expect(records[0].storeAddress).toBe('2820 Ygnacio Valley Rd Walnut Creek, CA 94598')
          expect(records[0].storePhoneNumber).toBe('925-433-4194');
          return records;
        });
    })
    .then((stores) => {
      storeIds = stores.map((store) => {
        return store._id.toString();
      });
      return ItemAvailability.find({})
        .then(records => {
          for (let record of records) {
            expect(record.itemAvailability).toHaveLength(5);
            for (let i = 0; i < 5; i++) {
              expect(typeof record.itemAvailability[i].availability).toBe('boolean');
              expect(storeIds).toContain(record.itemAvailability[i].storeId.toString());
            }
          }
          let dbItemIds = records.map((record) => {
            return record.itemId;
          });
          expect(dbItemIds).toHaveLength(100);
          for (let i = 100; i < 200; i++) {
            expect(dbItemIds).toContain(i.toString());
          }
        });
    });
});
