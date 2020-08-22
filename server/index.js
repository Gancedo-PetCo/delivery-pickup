const express = require('express');
const { ItemAvailability, Store } = require('../database-mongodb/itemAvailability.js');
const connect = require('../database-mongodb/connect.js');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Type', 'application/javascript');
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static(__dirname + '/../react-client/dist'));



//Create
app.post('/availableAt/:itemId/', (req, res) => {

});

//Read
app.get('/availableAt/:itemId/', (req, res) => {
  console.log('Trying to fetch data', req.params.itemId);
  return ItemAvailability.findOne({ itemId: req.params.itemId }, '-_id -__v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      if (data) {
        let storeData = data.itemAvailability.map((store) => {
          return {
            storeName: store.storeId.storeName,
            storeAddress: store.storeId.storeAddress,
            storePhoneNumber: store.storeId.storePhoneNumber,
            availability: store.availability
          };
        });

        res.status(200).send({ itemAvailability: storeData });
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
});

//Update
app.put('/availableAt/:itemId/', (req, res) => {

});

//Delete
app.delete('/availableAt/:itemId/', (req, res) => {

});




module.exports = app;
