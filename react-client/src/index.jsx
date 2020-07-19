import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
      <div className="deliveryPickupContainers">
        <div className="deliverPickup">
          <div className="deliverPickupHeader">Deliver it To Me</div>
          {this.state.itemPrice && <div className="deliverPickupItemPrice">{this.state.itemCurrency}{this.state.itemPrice}</div>}
          <div className="deliverText">
            <div className="deliveryTruck"></div> Order now to get it by <span className="deliveryDate">Wednesday, August 22</span>
          </div>
          <button className="deliverPickupButton">Add to Cart</button>
          <div className="addToWishlistDiv">
            <a className="addToWishlist">Add to Wishlist</a>
          </div>
        </div>
        {defaultStore && <div className="deliverPickup">
          <div className="deliverPickupHeader">I'll Pick It Up</div>
          <div className="cubsidePickup">
            <strong>10% off – See Price in Cart!</strong> Curbside pickup now available in most locations.
          </div>
          {this.state.itemPrice && <div className="deliverPickupItemPrice">{this.state.itemCurrency}{this.state.itemPrice}</div>}
          <div className={`itemAvailability ${defaultStore.availability ? 'itemAvailabilityGreen' : 'itemAvailabilityRed'}`}>{defaultStore.availability ? "Available at:": "Not Available at:"}</div>
          <div className="localStoreAvailability">
            <span className="pickupStoreName">{defaultStore.storeName.toUpperCase()}</span>
            <a className="changeStore">Change Store</a>
          </div>
          <button disabled={!defaultStore.availability} className="deliverPickupButton">{defaultStore.availability ? "Add to Cart": "Not Available"}</button>
        </div>}
      </div>
    );
  }
}

const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('itemID');
ReactDOM.render(<App itemId={itemId}/>, document.getElementById('itemAvailability'));
