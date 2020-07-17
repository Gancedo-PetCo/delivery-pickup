const {ItemAvailability, Store} = require('./itemAvailability.js')
const mongoose = require('mongoose');
const insertRecords = require('./insert_records');

beforeAll(() => {
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    return ItemAvailability.remove({})
  })
  .then(() => {
    return Store.remove({})
  })
})

afterAll(() => {
  return mongoose.connection.close();
})

test('insert item availability data', () => {
  return insertRecords()
    .then(() => {
      return Store.find({})
        .then(records => {
          expect(records).toHaveLength(5);
          expect(records[0].storeId).toBe(1);
          expect(records[0].storeName).toBe('N Walnut Creek');
          expect(records[0].storeAddress).toBe('2820 Ygnacio Valley Rd Walnut Creek, CA 94598')
          expect(records[0].storePhoneNumber).toBe('925-433-4194');
        })
    })
    .then(() => {
      return ItemAvailability.find({})
      .then(records => {
        let dbItemIds = records.map((record) => {
          return record.itemId;
        })
        expect(dbItemIds).toHaveLength(100);
        expect(records[0].itemAvailability).toHaveLength(5);
        expect(records[0].itemAvailability[0].storeId).toBe(1);
        expect(typeof records[0].itemAvailability[0].availability).toBe('boolean');
        expect(records[0].itemAvailability[1].storeId).toBe(2);
        expect(typeof records[0].itemAvailability[1].availability).toBe('boolean');
        expect(records[0].itemAvailability[2].storeId).toBe(3);
        expect(typeof records[0].itemAvailability[2].availability).toBe('boolean');
        expect(records[0].itemAvailability[3].storeId).toBe(4);
        expect(typeof records[0].itemAvailability[3].availability).toBe('boolean');
        expect(records[0].itemAvailability[4].storeId).toBe(5);
        expect(typeof records[0].itemAvailability[4].availability).toBe('boolean');
      })
    })
});
