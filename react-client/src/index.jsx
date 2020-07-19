import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DeliverPickup from './DeliverPickup.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemAvailability: null,
      itemPrice: null,
      itemCurrency: null
    }
  }

  componentDidMount () {
    console.log('Item id', this.props.itemId)
    $.ajax ({
      url: "http://127.0.0.1:3005/itemPrice/" + this.props.itemId,
      // url: "http://ec2-18-188-72-255.us-east-2.compute.amazonaws.com/itemImages/" + this.props.itemId,
      type: "get",
      success: (data) => {
        console.log('Data returned from the title amd price service', data);
        this.setState({
          itemPrice: data.price,
          itemCurrency: data.currency
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
    $.ajax ({
      url: "http://127.0.0.1:3006/availableAt/" + this.props.itemId,
      // url: "http://ec2-18-188-72-255.us-east-2.compute.amazonaws.com/itemImages/" + this.props.itemId,
      type: "get",
      success: (data) => {
        console.log('Data returned from the server', data.itemAvailability[0].storeName);
        this.setState({
          itemAvailability: data.itemAvailability
        })
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  render() {
    let defaultStore = this.state.itemAvailability ? this.state.itemAvailability[0]: null;
    return (
      (defaultStore && this.state.itemPrice)
        ? <DeliverPickup availability={defaultStore} price={this.state.itemPrice} currency={this.state.itemCurrency}/>
        : null
    );
  }
}

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemID');
ReactDOM.render(<App itemId={itemId}/>, document.getElementById('itemAvailability'));
