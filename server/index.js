const React = require('react');
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const cors = require('cors');
const PATH = require('path');
const { getData, deleteData, updateData, addData } = require('../database-couchdb/index.js');


require('@babel/register');
require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });
require('newrelic');
const App = require('../react-client/src/app.jsx');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { LOADER_TOKEN } = process.env;

const dummyData = {
  itemId: 99,
  itemAvailability: [{ store_name: 'blah', availability: false }]
};

app.get('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Type', 'application/javascript');
  res.set('Content-Encoding', 'gzip');
  next();
});



const constructHTMLFromTemplate = function (body) {
  return `
  <!DOCTYPE html>
  <html>

  <head>
    <title>deliverPickupService</title>
    <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
    <link rel="stylesheet" href="/style.css">
    </link>
  </head>

  <body>
    <div id="itemAvailability"></div>
      ${body}
  </body>
  <script src="/bundle.js"></script>
  </html>
  `;
};

app.use(express.static(__dirname + '/../react-client/templates'));
app.get('/app/:id', (req, res) => {

  const body = ReactDOMServer.renderToString(React.createElement(App, { data: dummyData }, null));
  const SSR = constructHTMLFromTemplate(body);
  res.status(200).send(SSR);
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

app.get(`/${LOADER_TOKEN}`, (req, res) => {
  res.sendFile(PATH.resolve(__dirname, '../loader.txt'));
})

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
