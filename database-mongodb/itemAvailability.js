const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  storeId: Number,
  storeName: String,
  storeAddress: String,
  storePhoneNumber: String
})

const itemAvailabilitySchema = new mongoose.Schema({
  itemId: String,
  itemAvailability: [{storeId: Number, availability: Boolean}]
});

const ItemAvailability = mongoose.model('ItemAvailability', itemAvailabilitySchema);
const Store = mongoose.model('Store', storeSchema);

module.exports.Store = Store;
module.exports.ItemAvailability = ItemAvailability;
