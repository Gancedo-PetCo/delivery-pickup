const React = require('react');
const DeliverPickup = require('./DeliverPickup.jsx');
const PropTypes = require('prop-types');


class App extends React.Component {
  // const App = class extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    this.state = {
      itemId: data.itemId,
      itemAvailability: data.itemAvailability,
      itemPrice: 5,
      itemCurrency: 'usd'
    };
  }


  render() {
    let defaultStore = this.state.itemAvailability ? this.state.itemAvailability[0] : null;
    return (
      <div>
        { (defaultStore && this.state.itemPrice)
          ? <DeliverPickup availability={defaultStore} price={this.state.itemPrice} currency={this.state.itemCurrency} />
          : <div>aa</div>
        }
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object
};

module.exports = App;