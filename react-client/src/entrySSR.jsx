const ReactDOM = require('react-dom');
// const axios = require('axios');
const App = require('./app.jsx');

let dummyData = {
  itemId: 99,
  itemAvailability: [{ store_name: 'blah', availability: false }]
};

let itemId = window.location.pathname.split('/')[2];
if (itemId) {
  axios.get(`http://3.101.117.62:3006/availableAt/${itemId}`)
    .then(({ data }) => {
      ReactDOM.hydrate(
        <App data={data} />,
        document.getElementById('itemAvailability'));
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  ReactDOM.hydrate(
    <App data={dummyData} />,
    document.getElementById('itemAvailability'));
}

