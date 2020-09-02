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
    let itemCSVpath1 = PATH.join(csvPath, 'itemTest1.csv');
    let itemCSVpath2 = PATH.join(csvPath, 'itemTest2.csv');

    let writeStream1 = fs.createWriteStream(itemCSVpath1);
    let readStream1 = fs.createReadStream(itemCSVpath1);
    writeStream1.write('item_id\n', 'utf8');

    let writeStream2 = fs.createWriteStream(itemCSVpath2);
    let readStream2 = fs.createReadStream(itemCSVpath2);
    writeStream2.write('item_id\n', 'utf8');

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream1, 1, itemMaker, encoding, () => {
        writeStream1.end();
        readStream1
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row.item_id).toEqual('100');
          })
          .on('end', () => {
            readStream1.destroy();
            done();
          });
      });
    });

    test('write 20 entries to a csv file', (done) => {
      dataWriter(writeStream2, 20, itemMaker, encoding, () => {
        let itemId = 100;
        writeStream2.end();
        readStream2
          .on('error', (err) => {
            console.error(err);
          })
          .pipe(csvParser())
          .on('data', (row) => {
            expect(row.item_id).toEqual(itemId.toString());
            itemId += 1;
          })
          .on('end', () => {
            readStream2.destroy();
            done();
          });
      });
    });
  });

  describe('for stores ', () => {
    let storeCSVpath1 = PATH.join(csvPath, 'storeTest1.csv');
    let storeCSVpath2 = PATH.join(csvPath, 'storeTest2.csv');

    let writeStream1 = fs.createWriteStream(storeCSVpath1);
    let readStream1 = fs.createReadStream(storeCSVpath1);
    writeStream1.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');

    let writeStream2 = fs.createWriteStream(storeCSVpath2);
    let readStream2 = fs.createReadStream(storeCSVpath2);
    writeStream2.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');

    // beforeEach(() => {
    //   writeStream = fs.createWriteStream(storeCSVpath);
    //   readStream = fs.createReadStream(storeCSVpath);
    //   writeStream.write('store_id,store_name,store_address,store_phone_number\n', 'utf8');
    // });

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream1, 1, storeMaker, encoding, () => {
        writeStream1.end();
        readStream1
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
            readStream1.destroy();
            done();
          });
      });
    });

    test('write 5 entries to a csv file', (done) => {
      dataWriter(writeStream2, 5, storeMaker, encoding, () => {
        let storeId = 1;
        writeStream2.end();
        readStream2
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
            readStream2.destroy();
            done();
          });
      });
    });
  });

  describe('for availability ', () => {
    let availabilityCSVpath1 = PATH.join(csvPath, 'availabilityTest1.csv');
    let availabilityCSVpath2 = PATH.join(csvPath, 'availabilityTest2.csv');

    let writeStream1 = fs.createWriteStream(availabilityCSVpath1);
    let readStream1 = fs.createReadStream(availabilityCSVpath1);
    writeStream1.write('item_idx,store_idx,availability\n', 'utf8');

    let writeStream2 = fs.createWriteStream(availabilityCSVpath2);
    let readStream2 = fs.createReadStream(availabilityCSVpath2);
    writeStream2.write('item_idx,store_idx,availability\n', 'utf8');

    // beforeEach(() => {
    //   writeStream = fs.createWriteStream(availabilityCSVpath);
    //   readStream = fs.createReadStream(availabilityCSVpath);
    //   writeStream.write('item_id,store_id,availability\n', 'utf8');
    // });

    test('write an single entry to a csv file', (done) => {
      dataWriter(writeStream1, 1, availabilityMaker, encoding, () => {
        let storeId = 1;
        writeStream1.end();
        readStream1
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
            readStream2.destroy();
            done();
          });
      });
    });

    test('write 5 entries to a csv file', (done) => {
      dataWriter(writeStream2, 20, availabilityMaker, encoding, () => {
        let storeId = 1;
        let itemId = 1;
        writeStream2.end();
        readStream2
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
            readStream2.destroy();
            done();
          });
      });
    });
  });
});