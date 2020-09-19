import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import DeliverPickup from './DeliverPickup.jsx'
import PropTypes from 'prop-types';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 100,
      itemAvailability: [
        {
          store_name: 'blah'
        }
      ],
      itemPrice: 5,
      itemCurrency: 'usd'
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this.props.itemId);
  }

  getData(itemId) {
    if (itemId != 99) {
      this.setState({
        itemId
      });
      Axios.get(`/availableAt/${itemId}`)
        .then(({ data }) => {
          this.setState({
            itemAvailability: data.itemAvailability
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  render() {
    let defaultStore = this.state.itemAvailability ? this.state.itemAvailability[0] : null;
    return (
      (defaultStore && this.state.itemPrice)
        ? <DeliverPickup availability={defaultStore} price={this.state.itemPrice} currency={this.state.itemCurrency} />
        : <div>aa</div>
    );
  }
}

App.propTypes = {
  itemId: PropTypes.number
};


let urlParams = window.location.pathname.split('/');
ReactDOM.render(
  <App itemId={urlParams[2] ? urlParams[2] : 99} />,
  document.getElementById('itemAvailability'));
