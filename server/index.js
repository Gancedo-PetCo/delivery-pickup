const express = require('express');
const PATH = require('path');
require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });
// require('newrelic');
const { getData, deleteData, updateData, addData } = require('../database-couchdb/index.js');
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

app.get('/app/:id', (req, res) => {
  res.sendFile(PATH.resolve(__dirname, '../react-client/dist/index.html'));
});

app.get('/availableAt/:itemId', (req, res) => {
  let itemId = req.params.itemId;
  console.log('GET received! ID: ', itemId);

  getData(itemId)
    .then((data) => {
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        // console.log(data)
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});


app.post('/availableAt', (req, res) => {
  let data = req.body;
  console.log('POST received! Data: ', data);

  addData(data)
    .then((data) => {
      if (data.ok) {
        res.status(200).send(data);
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/availableAt/:itemId', (req, res) => {
  let itemId = req.params.itemId;
  let data = req.body;
  console.log('Put received! ID: ', itemId);

  updateData(itemId, data)
    .then((data) => {
      if (data.ok) {
        res.status(200).send(data);
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

app.delete('/availableAt/:itemId', (req, res) => {
  let itemId = req.params.itemId;
  console.log('DELETE received! ID: ', itemId);

  deleteData(itemId)
    .then((data) => {
      console.log('data: ', data);
      if (data.ok) {
        res.status(200).send(data);
      } else {
        res.sendStatus(500);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

module.exports = app;
