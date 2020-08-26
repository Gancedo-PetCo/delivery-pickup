const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const storeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  storeName: String,
  storeAddress: String,
  storePhoneNumber: String
});

const itemAvailabilitySchema = new mongoose.Schema({
  itemId: {
    unique: true,
    type: String
  },
  itemAvailability: [{ storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, availability: Boolean }]
});

const ItemAvailability = mongoose.model('ItemAvailability', itemAvailabilitySchema);
const Store = mongoose.model('Store', storeSchema);


const createItemAvailability = (data) => {
  return ItemAvailability.create({
    ...data
  }).then(null, (err) => {
    if (err.code === 11000) {
      console.log('wat');
      return ItemAvailability.findOne({ ...data }).exec();
    } else {
      throw err;
    }
  })
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
      // console.log(data);
      let storeData = data.itemAvailability.map((store) => {
        return {
          storeName: store.storeId.storeName,
          storeAddress: store.storeId.storeAddress,
          storePhoneNumber: store.storeId.storePhoneNumber,
          availability: store.availability
        };
      });
      return {
        itemAvailability: storeData,
        itemId
      };
    })
    .catch((err) => {
      return err;
    });
};


const updateItemAvailability = (itemId, data) => {
  return ItemAvailability.findOneAndUpdate({ itemId }, { ...data }, { new: true })
    .then((data) => {
      return data;
    })
    .catch(((err) => {
      return err;
    }));
};

const deleteItemAvailability = (itemId) => {
  return ItemAvailability.deleteOne({ itemId })
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((err) => {
      // console.error('err', err);
      return err;
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