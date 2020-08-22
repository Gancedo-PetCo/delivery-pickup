const insertRecords = require('../database-mongodb/insert_records.js');
const config = require('../config.js');
const { ItemAvailability, Store, CrudOps } = require('../database-mongodb/itemAvailability.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/index.js');

beforeAll(async () => {

  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    poolSize: 10
  })
    .then(() => {
      ItemAvailability.remove({});
    })
    .then(() => {
      Store.remove({});
    })
    .then(() => {
      insertRecords();
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});

// test('successfully retrieves availability data for item 106', () => {
//   return ItemAvailability.findOne({ itemId: '106' })
//     .populate({
//       path: 'itemAvailability',
//       populate: {
//         path: 'storeId'
//       }
//     })
//     .then((data) => {
//       return request(app).get('/availableAt/106/')
//         .then((response) => {
//           // console.log(response.body);
//           expect(response.status).toBe(200);
//           expect(response.body.itemAvailability).toHaveLength(5);
//           expect(response.body.itemAvailability[0].availability).toBe(data.itemAvailability[0].availability);
//           expect(response.body.itemAvailability[0].storeName).toBe(data.itemAvailability[0].storeId.storeName);
//           expect(response.body.itemAvailability[0].storeAddress).toBe(data.itemAvailability[0].storeId.storeAddress);
//           expect(response.body.itemAvailability[0].storePhoneNumber).toBe(data.itemAvailability[0].storeId.storePhoneNumber);
//         });
//     });
// });

describe('BackEnd Tests', () => {
  test('successfully retrieves availability data for item 106', () => {
    let data = CrudOps.readItemAvailability('106', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        return data;
      }
    });
    expect(data).toHaveProperty('itemId');
    expect(data).toHaveProperty('itemAvailability');
    expect(data.itemAvailabilitylength).toBeGreaterThan(0);
  });
});




// describe('Requests Test', () => {
//   test('returns 404 status code if item not found', () => {
//     return request(app).get('/availableAt/200')
//       .then((response) => {
//         expect(response.status).toBe(404);
//       });
//   });
// });