const morgan = require('morgan');
const app = require('./index.js');

const PORT = 3000;
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
