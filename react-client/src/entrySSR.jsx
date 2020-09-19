const ReactDOM = require('react-dom');
// const axios = require('axios');
const App = require('./app.jsx');

let dummyData = {
  itemId: 99,
  itemAvailability: [{ store_name: 'blah', availability: false }]
};

let urlParams = window.location.pathname.split('/');
if (urlParams[2]) {
  axios.get(`/availableAt/${urlParams[2]}`)
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

