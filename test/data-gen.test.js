const fs = require('fs');
const PATH = require('path');
const csvParser = require('csv-parser');
const { itemMaker, storeMaker, availabilityMaker, dataWriter } = require('../data-gen/data-gen-functions.js');
const csvPath = PATH.resolve(__dirname, 'test-csv');
const encoding = 'utf-8';

describe('maker function: ', () => {

  describe('itemMaker should: ', () => {
    test('be able to create 1 itemId starting at 100', (done) => {
      let item = itemMaker(1);

      expect(item.length).toEqual(1);
      expect(item[0]).toBe('100\n');
      done();
    });
  });

  describe('storeMaker should: ', () => {
    test('be able to create 1 store', (done) => {
      let store = storeMaker(1);

      expect(store.length).toEqual(1);
      expect(store[0].split(',').length).toEqual(4);
      done();
    });
  });

  describe('availabilityMaker should: ', () => {
    test('be able to create the availability for 1 item', (done) => {
      let availability = availabilityMaker(1);

      expect(availability.length).toEqual(5);
      expect(availability[0].split(',').length).toEqual(3);

      for (let i = 0; i < 5; i++) {
        let subArray = availability[i].split(',');
        expect(subArray[0]).toBe('1');
        expect(subArray[1]).toBe((i + 1).toString());
        expect(subArray[2]).toMatch(/(?:true|false)/)
      }
      done();
    });
  });
});

describe('dataWriter should: ', () => {

  describe('for items ', () => {
    let itemCSVpath = PATH.join(csvPath, 'itemTest.csv');

    let writeStream = fs.createWriteStream(itemCSVpath);
    let readStream = fs.createReadStream(itemCSVpath);

    beforeEach(() => {
      writeStream = fs.createWriteStream(itemCSVpath);
      readStream = fs.createReadStream(itemCSVpath);
      writeStream.write('item_id\n', 'utf8');
    });

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream, 1, itemMaker, encoding, () => {
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row.item_id).toEqual('100');
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });

    test('write 20 entries to a csv file', (done) => {
      dataWriter(writeStream, 20, itemMaker, encoding, () => {
        let itemId = 100;
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row.item_id).toEqual(itemId.toString());
            itemId += 1;
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });
  });

  describe('for stores ', () => {
    let storeCSVpath = PATH.join(csvPath, 'storeTest.csv');

    let writeStream = fs.createWriteStream(storeCSVpath);
    let readStream = fs.createReadStream(storeCSVpath);

    beforeEach(() => {
      writeStream = fs.createWriteStream(storeCSVpath);
      readStream = fs.createReadStream(storeCSVpath);
      writeStream.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');
    });

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream, 1, storeMaker, encoding, () => {
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row).toEqual(
              expect.objectContaining({
                store_id: '1',
                store_name: expect.any(String),
                store_address: expect.any(String),
                store_phone_number: expect.any(String),
              })
            );
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });

    test('write 5 entries to a csv file', (done) => {
      dataWriter(writeStream, 5, storeMaker, encoding, () => {
        let storeId = 1;
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row).toEqual(
              expect.objectContaining({
                store_id: storeId.toString(),
                store_name: expect.any(String),
                store_address: expect.any(String),
                store_phone_number: expect.any(String),
              })
            );
            storeId += 1;
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });
  });

  describe('for availability ', () => {
    let availabilityCSVpath = PATH.join(csvPath, 'availabilityTest.csv');

    let writeStream = fs.createWriteStream(availabilityCSVpath);
    let readStream = fs.createReadStream(availabilityCSVpath);

    beforeEach(() => {
      writeStream = fs.createWriteStream(availabilityCSVpath);
      readStream = fs.createReadStream(availabilityCSVpath);
      writeStream.write('item_id,store_id,availability\n', 'utf8');
    });

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream, 1, availabilityMaker, encoding, () => {
        let storeId = 1;
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row).toEqual(
              expect.objectContaining({
                item_id: '1',
                store_id: storeId.toString(),
                availability: expect.stringMatching(/(?:true|false)/)
              })
            );
            storeId = storeId === 5 ? 1 : storeId + 1;
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });

    test('write 5 entries to a csv file', (done) => {
      dataWriter(writeStream, 20, availabilityMaker, encoding, () => {
        let storeId = 1;
        let itemId = 1;
        writeStream.end();
        readStream
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row).toEqual(
              expect.objectContaining({
                item_id: itemId.toString(),
                store_id: storeId.toString(),
                availability: expect.stringMatching(/(?:true|false)/)
              })
            );
            itemId = storeId === 5 ? itemId += 1 : itemId;
            storeId = storeId === 5 ? 1 : storeId + 1;
          })
          .on('end', () => {
            readStream.destroy();
            done();
          });
      });
    });
  });
});