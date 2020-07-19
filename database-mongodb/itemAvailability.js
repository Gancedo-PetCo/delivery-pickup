const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  storeName: String,
  storeAddress: String,
  storePhoneNumber: String
})

const itemAvailabilitySchema = new mongoose.Schema({
  itemId: String,
  itemAvailability: [{storeId: {type: mongoose.Schema.Types.ObjectId, ref: 'Store'}, availability: Boolean}]
});

const ItemAvailability = mongoose.model('ItemAvailability', itemAvailabilitySchema);
const Store = mongoose.model('Store', storeSchema);

module.exports.Store = Store;
module.exports.ItemAvailability = ItemAvailability;
