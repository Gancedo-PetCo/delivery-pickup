const morgan = require('morgan');
const app = require('./index.js');
// const connect = require('../database-mongodb/connect.js');
const PORT = 3006;
app.use(morgan('dev'));


// connect()
//   .then(() => {
//     console.log('Connected to database');
//   });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
