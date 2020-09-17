// aws config
// module.exports = {
//   mongoUri: 'mongodb://172.31.46.64:27017/itemAvailability',
//   itemPrice: 'http://52.14.208.55:3005/itemPrice/',
//   availableAt: 'http://18.224.229.28:3006/availableAt/'

// };

// local config
module.exports = {
  mongoUri: 'mongodb://localhost:27017/itemAvailability',
  serverUri: 'mongodb://localhost:27017/serverTest',
  seedUri: 'mongodb://localhost:27017/seedTest',
  itemPrice: 'http://127.0.0.1:3005/itemPrice/',
  availableAt: 'http://127.0.0.1:3000/availableAt/'
};
