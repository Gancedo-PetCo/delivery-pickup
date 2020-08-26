const express = require('express');
const { CrudOps } = require('../database-mongodb/itemAvailability.js');
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
  console.log('POST received! ID: ', req.params.itemId);
  CrudOps.createItemAvailability(req.body.data, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }
  });
});

//Read
app.get('/availableAt/:itemId/', (req, res) => {
  console.log('GET received! ID: ', req.params.itemId);
  CrudOps.readItemAvailability(req.params.itemId)
    .then((data) => {
      // console.log('data: ', data);
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//Update
app.put('/availableAt/:itemId/', (req, res) => {
  console.log('PUT received! ID: ', req.params.itemId);
  CrudOps.updateItemAvailability(req.params.itemId, { ...req.body.data }, (err, oldData) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(oldData);
    }
  });
});

//Delete
app.delete('/availableAt/:itemId/', (req, res) => {
  console.log('DELETE received! ID: ', req.params.itemId);
  CrudOps.deleteItemAvailability(req.params.itemId, (err, doc) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(doc);
    }
  })
});




module.exports = app;
