
const axios = require('axios');
const PATH = require('path');
require('dotenv').config({ path: PATH.join(__dirname, '..', '.env') });


const { COUCH_URL, COUCH_PWD, COUCH_USER, COUCH_DB } = process.env;
const url = `http://${COUCH_USER}:${COUCH_PWD}@${COUCH_URL}/${COUCH_DB}`;
const startId = 100;

const getRevId = (itemId) => {
  return axios.post(url + '/_find',
    {
      'selector': {
        _id: {
          '$eq': itemId
        }
      },
      'fields': ['_rev'],
      'limit': 1,
    }
  )
    .then((data) => {
      return data.data.docs[0]._rev;
    })
    .catch((err) => {
      console.error(err);
    });
}

exports.getData = (itemId) => {
  return axios.post(url + '/_find',
    {
      'selector': {
        _id: {
          '$eq': itemId
        }
      },
      'fields': ['itemId', 'itemAvailability'],
      'limit': 1,
    }
  )
    .then((data) => {
      return data.data.docs[0];
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.updateData = async (itemId, info) => {

  info._rev = await getRevId(itemId);
  return axios.put(url + `/${itemId}`, info)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.deleteData = async (itemId) => {

  let rev = await getRevId(itemId);

  return axios.delete(url + `/${itemId}?rev=${rev}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.addData = async (data) => {
  let id = await axios.get(url)
    .then((data) => {
      return data.data.doc_count;
    })
    .catch((err) => {
      console.error(err);
    });
  return axios.put(url + `/${id + startId}`, data)
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err);
    });
};