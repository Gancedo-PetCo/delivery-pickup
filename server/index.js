const React = require('react');
const express = require('express');
const ReactDOMServer = require('react-dom/server');
const redis = require("redis");
const PATH = require('path');
const cors = require('cors');
const { getData, deleteData, updateData, addData } = require('../database-couchdb/index.js');

require('@babel/register');
require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });
require('newrelic');

const { REDIS_PORT, LOADER_TOKEN } = process.env;
const app = express();
const redis_client = redis.createClient(REDIS_PORT);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const App = require('../react-client/src/app.jsx');

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

const checkCache = (req, res, next) => {
  const itemId = req.params.itemId;

  redis_client.get(itemId, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }
    if (data != null) {
      console.log('redis found it!');
      res.send(data);
    } else {
      next();
    }
  })
}

app.use(express.static(__dirname + '/../react-client/templates'));
app.use(express.static(__dirname + '/../react-client/src'));

app.get('/app/:id', (req, res) => {

  const body = ReactDOMServer.renderToString(React.createElement(App, { data: dummyData }, null));
  const SSR = constructHTMLFromTemplate(body);
  res.status(200).send(SSR);
});

app.get('/availableAt/:itemId', checkCache, async (req, res) => {
  let itemId = req.params.itemId;
  console.log('GET received! ID: ', itemId);

  try {
    const data = await getData(itemId);
    if (Object.keys(data).length === 0) {
      res.sendStatus(404);
    } else {
      redis_client.setex(itemId, 7200, JSON.stringify(data));
      return res.status(200).send(data);
    }
  } catch (err) {
    console.error('aaa ', err);
    return res.status(500).json(err);
  }
});

app.get(`/${LOADER_TOKEN}.txt`, (req, res) => {
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
