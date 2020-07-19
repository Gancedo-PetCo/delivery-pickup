const insertRecords = require('../database-mongodb/insert_records.js');
const {ItemAvailability, Store} = require('../database-mongodb/itemAvailability.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/index.js');

beforeAll(() => {
  return mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    .then(() => {
      return ItemAvailability.remove({})
    })
    .then(() => {
      return Store.remove({})
    })
    .then(() => {
      return insertRecords()
    })
})

afterAll(() => {
  return mongoose.connection.close();
})

test('successfully retrieves availability data for item 106', () => {
  return ItemAvailability.findOne({ itemId: '106' })
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      return request(app).get('/availableAt/106/')
        .then((response) => {
          // console.log(response.body);
          expect(response.status).toBe(200);
          expect(response.body.itemAvailability).toHaveLength(5);
          expect(response.body.itemAvailability[0].availability).toBe(data.itemAvailability[0].availability);
          expect(response.body.itemAvailability[0].storeName).toBe(data.itemAvailability[0].storeId.storeName);
          expect(response.body.itemAvailability[0].storeAddress).toBe(data.itemAvailability[0].storeId.storeAddress);
          expect(response.body.itemAvailability[0].storePhoneNumber).toBe(data.itemAvailability[0].storeId.storePhoneNumber);
        })
  })

});
