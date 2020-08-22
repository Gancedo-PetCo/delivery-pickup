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


const createItemAvailability = (data, CB) => {
  ItemAvailability.create({ ...data }, (err, small) => {
    if (err) {
      CB(err, null);
    } else {
      CB(null, small);
    }
  });
};

const readItemAvailability = (itemId, CB) => {
  ItemAvailability.findOne({ itemId }, '-_id -__v')
    .populate({
      path: 'itemAvailability',
      populate: {
        path: 'storeId'
      }
    })
    .then((data) => {
      if (data) {
        let storeData = data.itemAvailability.map((store) => {
          return {
            storeName: store.storeId.storeName,
            storeAddress: store.storeId.storeAddress,
            storePhoneNumber: store.storeId.storePhoneNumber,
            availability: store.availability
          };
        });
        CB(null, { itemAvailability: storeData });
      } else {
        CB(null, {});
      }
    })
    .catch((err) => {
      CB(err);
    });
};

const updateItemAvailability = (itemID, data, CB) => {
  ItemAvailability.updateOne({ itemId }, { ...data }, (err, result) => {
    if (err) {
      CB(err);
    } else {
      CB(null, result);
    }
  });
};

const deleteItemAvailability = (itemID, CB) => {
  ItemAvailability.deleteOne({ itemID }, (err) => {
    if (err) {
      CB(err);
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
