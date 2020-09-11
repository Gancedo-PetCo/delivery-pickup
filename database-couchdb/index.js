const fs = require('fs');
const PATH = require('path');
const csvParser = require('csv-parser');
const Axios = require('axios');

const availabilityPath = PATH.resolve(__dirname, '..', 'data-gen', 'csv', 'availability.csv');
// const availabilityPath = PATH.resolve(__dirname, '..', 'test', 'test-csv', 'availabilityTest2.csv');
const storesPath = PATH.resolve(__dirname, '..', 'data-gen', 'csv', 'stores.csv');

const startingItemId = 100;
// const endingItemId = 10000100;
const batchSize = 100;

const removeOldData = (url, db) => {

  return Axios.delete(url + db)
    // .then(() => {
    //   //db exists
    //   Axios.delete(url + db)
    //     .then((res) => {
    //       return res;
    //     })
    //     .catch((err) => {
    //       return err;
    //     });
    // })
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
        // console.log(data);
        count++;
        if (entry.itemId === undefined) {
          entry.itemId = entry._id = curId.toString();
          entry.itemAvailability = stores;
        }
        // console.log(data.store_id);
        entry.itemAvailability[parseInt(data.store_id) - 1].availability = data.availability;
        if (count === 5) {
          docs.push(entry);
          entry = {};
          curId++;
          count = 0;
        }
        if (docs.length === batchSize) {
          // console.log('hmmm');
          console.log(curId);
          availabilityStream.pause();
          // console.log('paused');
          Axios.post(url + db + '/_bulk_docs', { docs })
            .then(() => {
              console.log('posted!');
              // entry = {};
              // curId++;
              // count = 0;
              setTimeout(() => {
                console.log('Now data will start flowing again. ' + curId);
                // docs = [];
                availabilityStream.resume();
              }, 500);
            })
            .catch((err) => {
              console.error(err);
            });
          // setTimeout(() => {
          //   console.log('Now data will start flowing again. ' + curId);
          //   // docs = [];
          //   availabilityStream.resume();
          // }, 10000);
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