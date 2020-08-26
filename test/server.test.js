const insertRecords = require('../database-mongodb/insert_records.js');
const config = require('../config.js');
const { ItemAvailability, Store, CrudOps } = require('../database-mongodb/itemAvailability.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server/index.js');



beforeAll(async () => {
  await mongoose.connect(config.serverUri, {
    useNewUrlParser: true,
    poolSize: 10
  }).then(() => {
    ItemAvailability.remove({});
  })
    .then(() => {
      Store.remove({});
    })
    .then(() => {
      insertRecords();
    })
    .then(() => {
      console.log('seeded!');
    });
});

afterAll(async () => {
  await mongoose.connection.close();
});




// describe('BackEnd Test', () => {
//   test('successfully runs GET request on item that exists', () => {
//     let storeId = Store.find({}).select('_id')[0];
//     let goodData = {
//       itemId: '201',
//       itemAvailability: [
//         {
//           storeId: storeId,
//           availability: true
//         }
//       ]
//     }
//     CrudOps.createItemAvailability(goodData, (err, data) => {
//       expect(err).toEqual(null);
//       expect(data).toHaveProperty('itemId');
//       expect(data).toHaveProperty('itemAvailability');
//       done();
//     })
//   });

// });



describe('Requests Test', () => {
  test('returns 200 status code if item found', () => {
    return request(app).get('/availableAt/101')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
  test('returns 404 status code if item not found', () => {
    return request(app).get('/availableAt/200')
      .then((response) => {
        expect(response.status).toBe(404);
      });
  });
});