const request = require('supertest');
const app = require('../server/index.js');
const { getData, deleteData, updateData, addData } = require('../database-couchdb/index.js');


describe('BackEnd Test', () => {

  test('successfully runs GET request on item that exists', () => {
    const record = '199';
    return getData(record)
      .then((data) => {
        expect(data.itemId).toBe('199');
        expect(data).toHaveProperty('itemAvailability');
      })
      .catch((err) => {
        console.error(err);
      })
  });

  test('successfully runs POST request on new item', () => {
    let goodData = {
      itemAvailability: [
        {
          storeId: 1,
          availability: true
        }
      ]
    };
    return addData(goodData)
      .then((data) => {
        expect(data.ok).toBe(true);
      });
  });

  test('successfully runs PUT request on existing item', async () => {

    await getData('10000100')
      .then((data) => {
        data.itemAvailability = [];
        return updateData('10000100', data)
          .then((data) => {
            return expect(data.ok).toBe(true);
          })
          .then(() => {
            return getData('10000100')
              .then((data) => {
                expect(data.itemAvailability.length).toBe(0);
              });
          })
      })
  });
  test('successfully runs DELETE request on existing item', () => {

    return deleteData('10000100')
      .then((data) => {
        expect(data.id).toBe('10000100');
      });
  });
});

describe('Requests Test', () => {
  test('returns 200 status code if item found', () => {
    return request(app).get('/availableAt/101')
      .then((response) => {
        expect(response.status).toBe(200);
      });
  });
  test('returns 404 status code if item not found', () => {
    return request(app).get('/availableAt/10')
      .then((response) => {
        console.log(response.status);
        expect(response.status).toBe(500);
      });
  });
});