const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const App = require('./app.jsx');



let urlParams = window.location.pathname.split('/');
console.log(urlParams);
if (urlParams[2]) {
  axios.get(`/availableAt/${urlParams[2]}`)
    .then(({ data }) => {
      ReactDOM.render(
        <App data={data} />,
        document.getElementById('itemAvailability'));
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  ReactDOM.render(
    <App data={{
      itemId: 99,
      itemAvailability: [{ store_name: 'blah', availability: false }]
    }} />,
    document.getElementById('itemAvailability'));
}

