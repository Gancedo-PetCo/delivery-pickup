const Axios = require('axios');

const removeOldData = (url, db) => {

  return Axios.get(url + db)
    .then(() => {
      //db exists
      Axios.delete(url + db)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    })
    .catch(() => {
      return;
    });
};

const createNewData = (url, db) => {

}

exports.removeOldData = removeOldData;
exports.createNewData = createNewData;