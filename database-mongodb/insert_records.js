const {Store, ItemAvailability} = require('./itemAvailability.js');

let storeData = [
  {
    storeId: 1,
    storeName: 'N Walnut Creek',
    storeAddress: '2820 Ygnacio Valley Rd Walnut Creek, CA 94598',
    storePhoneNumber: '925-433-4194'
  },
  {
    storeId: 2,
    storeName: 'Walnut Creek',
    storeAddress: '1301 S. California Blvd Walnut Creek, CA 94596-5124',
    storePhoneNumber: '925-988-9370'
  },
  {
    storeId: 3,
    storeName: 'Concord',
    storeAddress: '1150 Concord Ave Suite 160 Concord, CA 94520',
    storePhoneNumber: '925-356-0217'
  },
  {
    storeId: 4,
    storeName: 'Martinez',
    storeAddress: '1170 Arnold Drive No. 115 Martinez, CA 94553',
    storePhoneNumber: '925-370-6060'
  },
  {
    storeId: 5,
    storeName: 'San Ramon',
    storeAddress: '2005 Crow Canyon PI San Ramon, CA 94583-1361',
    storePhoneNumber: '925-275-2111'
  }
]

let insertStoreData = () => {
  return Store.insertMany(storeData)
}

const generateRecords = () => {
  let itemData = [];
  for (let i = 100; i < 200; i++) {
    let itemAvailability = storeData.map((value) => {
      return {storeId: value.storeId, availability: Math.random() < 0.7}
    })
    itemData.push({itemId: i.toString(), itemAvailability});
  }
  return itemData;
}

let insertRecords = () => {
    return insertStoreData()
    .then(() => {
      return ItemAvailability.insertMany(generateRecords())
    })
    .then(() => {
      console.log('Successfully inserted records')
    })
}


module.exports = insertRecords;
