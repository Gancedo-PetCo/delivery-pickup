const express = require('express');
// const { CrudOps } = require('../database-mongodb/itemAvailability.js');
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

app.get('/availableAt/:itemId', (req, res) => {
  let itemId = req.params.itemId;
  console.log('GET received! ID: ', itemId);

  getData(itemId)
    .then((data) => {
      console.log('data: ', data);
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data.data.docs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

app.post('/availableAt', (req, res) => {
  let itemId = req.params.itemId;
  console.log('POST received! Data: ', req.body.data);

  addData(itemId)
    .then((data) => {
      console.log('data: ', data);
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data.data.docs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

app.put('/availableAt/:itemId', (req, res) => {
  let itemId = req.params.itemId;
  console.log('Put received! ID: ', itemId);

  updateData(itemId)
    .then((data) => {
      console.log('data: ', data);
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data.data.docs[0]);
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
      if (Object.keys(data).length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(data.data.docs[0]);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });

});

// //Create
// app.post('/availableAt', (req, res) => {
//   console.log('POST received!');
//   CrudOps.createItemAvailability(req.body.data)
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {

//       res.sendStatus(400);
//     });
//   //   , (err, data) => {
//   //   if (err) {
//   //     res.sendStatus(400);
//   //   } else {
//   //     res.status(200).send(data);
//   //   }
//   // }
//   // );
// });

// //Read
// app.get('/availableAt/:itemId/', (req, res) => {
//   console.log('GET received! ID: ', req.params.itemId);
//   CrudOps.readItemAvailability(req.params.itemId)
//     .then((data) => {
//       // console.log('data: ', data);
//       if (Object.keys(data).length === 0) {
//         res.sendStatus(404);
//       } else {
//         res.status(200).send(data);
//       }
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

// //Update
// app.put('/availableAt/:itemId/', (req, res) => {
//   console.log('PUT received! ID: ', req.params.itemId);
//   CrudOps.updateItemAvailability(req.params.itemId, { ...req.body.data })
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     });
// });

// //Delete
// app.delete('/availableAt/:itemId/', (req, res) => {
//   console.log('DELETE received! ID: ', req.params.itemId);
//   CrudOps.deleteItemAvailability(req.params.itemId)
//     .then((data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send(err)
//     });
// });




module.exports = app;
