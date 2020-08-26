const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  storeName: String,
  storeAddress: String,
  storePhoneNumber: String
});

const itemAvailabilitySchema = new mongoose.Schema({
  itemId: String,
  itemAvailability: [{ storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, availability: Boolean }]
});

const ItemAvailability = mongoose.model('ItemAvailability', itemAvailabilitySchema);
const Store = mongoose.model('Store', storeSchema);


const createItemAvailability = (data) => {
  return ItemAvailability.create({ ...data });
};

const readItemAvailability = (itemId) => {

  return ItemAvailability.findOne({ itemId }, '-_id -__v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      let storeData = data.itemAvailability.map((store) => {
        return {
          storeName: store.storeId.storeName,
          storeAddress: store.storeId.storeAddress,
          storePhoneNumber: store.storeId.storePhoneNumber,
          availability: store.availability
        };
      });
      return { itemAvailability: storeData };
    })
    .catch((err) => {
      return err;
    });
};


const updateItemAvailability = (itemID, data, CB) => {
  ItemAvailability.findOneAndUpdate({ itemId }, { ...data }, (err, result) => {
    if (err) {
      CB(err);
    } else {
      CB(null, result);
    }
  });
};

const deleteItemAvailability = (itemID, CB) => {
  ItemAvailability.deleteOne({ itemID }, (err, doc) => {
    if (err) {
      CB(err);
    } else {
      CB(null, doc);
    }
  });

};



module.exports.Store = Store;
module.exports.ItemAvailability = ItemAvailability;
module.exports.CrudOps = {
  createItemAvailability,
  readItemAvailability,
  updateItemAvailability,
  deleteItemAvailability
};