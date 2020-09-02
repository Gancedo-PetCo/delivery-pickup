// const insertRecords = require('../database-mongodb/insert_records.js');
// const config = require('../config.js');
// const { ItemAvailability, Store, CrudOps } = require('../database-mongodb/itemAvailability.js');
// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../server/index.js');


// beforeAll(async () => {
//   await mongoose.connect(config.serverUri, {
//     useNewUrlParser: true,
//     poolSize: 10
//   }).then(() => {
//     return ItemAvailability.remove({});
//   })
//     .then(() => {
//       return Store.remove({});
//     })
//     .then(() => {
//       return insertRecords();
//     })
//     .then(() => {
//       console.log('seeded!');
//     });
// });

// afterAll(async () => {
//   await mongoose.connection.close();
// });


// describe('BackEnd Test', () => {

//   test('successfully runs GET request on item that exists', () => {
//     const record = '199';
//     CrudOps.readItemAvailability(record)
//       .then((data) => {
//         // console.log(data);
//         expect(data.itemId).toBe('199');
//         expect(data).toHaveProperty('itemAvailability');
//       })
//   });

//   test('successfully runs POST request on new item', () => {
//     let storeId = Store.find({}).select('_id')[0];
//     let goodData = {
//       itemId: '202',
//       itemAvailability: [
//         {
//           storeId: storeId,
//           availability: true
//         }
//       ]
//     };
//     CrudOps.createItemAvailability(goodData)
//       .then((data) => {
//         // console.log(data);
//         expect(data).toHaveProperty('itemId');
//         expect(data).toHaveProperty('itemAvailability');
//       });
//   });

//   test('successfully runs PUT request on existing item', () => {

//     CrudOps.readItemAvailability('101')
//       .then((data) => {
//         data.itemAvailability = [];
//         CrudOps.updateItemAvailability('101', data)
//           .then((data) => {
//             // console.log(data);
//             expect(data.itemAvailability.length).toBe(0);
//           })
//       })
//   });
//   test('successfully runs DELETE request on existing item', () => {

//     CrudOps.deleteItemAvailability('102')
//       .then((data) => {
//         console.log(data);
//         CrudOps.readItemAvailability('102')
//           .then((data) => {
//             console.log(data);
//             expect(Object.keys(data).length).toBe(0);
//           })
//       })

//   });
// });

// describe('Requests Test', () => {
//   test('returns 200 status code if item found', () => {
//     return request(app).get('/availableAt/101')
//       .then((response) => {
//         expect(response.status).toBe(200);
//       });
//   });
//   test('returns 404 status code if item not found', () => {
//     return request(app).get('/availableAt/203')
//       .then((response) => {
//         console.log(response.status);
//         expect(response.status).toBe(404);
//       });
//   });
// });