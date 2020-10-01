const fs = require('fs');
const PATH = require('path');
const csvParser = require('csv-parser');
const axios = require('axios');

const availabilityPath = PATH.resolve(__dirname, '..', 'data-gen', 'csv', 'availability.csv');
const storesPath = PATH.resolve(__dirname, '..', 'data-gen', 'csv', 'stores.csv');

const startingItemId = 100;
const batchSize = 100;

const removeOldData = (url, db) => {

  return axios.delete(url + db)
    .catch((err) => {
      return err;
    });
};

const createNewData = (url, db) => {
  let curId = startingItemId;
  let availabilityStream = fs.createReadStream(availabilityPath);

  const writeData = async (curIds, stores) => {
    let count = 0;
    let docs = [];
    let entry = {};
    let curId = curIds
    availabilityStream
      .on('error', (err) => {
        console.error(err);
      })
      .pipe(csvParser())
      .on('data', (data) => {

        count++;
        if (entry.itemId === undefined) {
          entry.itemId = entry._id = curId.toString();
          entry.itemAvailability = stores;
        }

        entry.itemAvailability[parseInt(data.store_id) - 1].availability = data.availability;
        if (count === 5) {
          docs.push(entry);
          entry = {};
          curId++;
          count = 0;
        }
        if (docs.length === batchSize) {

          console.log(curId);
          availabilityStream.pause();

          axios.post(url + db + '/_bulk_docs', { docs })
            .then(() => {
              console.log('posted!');
              setTimeout(() => {
                console.log('Now data will start flowing again. ' + curId);

                availabilityStream.resume();
              }, 500);
            })
            .catch((err) => {
              console.error(err);
            });
          docs = [];
        }
      })
      .on('end', () => {
        console.log('seed done!');
        availabilityStream.destroy();
      });
  }
  getStoreData((stores) => {
    writeData(curId, stores);
  });

}

const getStoreData = (CB) => {
  let storesStream = fs.createReadStream(storesPath);
  let stores = [];
  storesStream
    .on('error', (err) => {
      console.error(err);
    })
    .pipe(csvParser())
    .on('data', (data) => {
      let store = data;
      store.storeId = data.store_id;
      store.availability = false;
      // console.log(store);
      stores.push(store);
    })
    .on('end', () => {
      storesStream.destroy();
      CB(stores);
    });

};

exports.removeOldData = removeOldData;
exports.createNewData = createNewData;