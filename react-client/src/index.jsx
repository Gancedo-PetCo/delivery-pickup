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
      itemAvailability: [],
      itemPrice: 5,
      itemCurrency: 'usd'
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.itemId);
    this.getData(this.props.itemId === '' ? undefined : this.props.itemId);
  }

  getData(itemId = 99) {
    if (itemId === 99) {
      this.setState({
        itemAvailability: []
      });
    } else {
      Axios.get(`/availableAt/${itemId}`)
        .then(({ data }) => {
          console.log(data);
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


const urlParams = window.location.pathname.split('/');
const urlid = urlParams[2];
ReactDOM.render(<App itemId={urlid} />, document.getElementById('itemAvailability'));
