const React = require('react');
const DeliverPickup = require('./DeliverPickup.jsx');
const PropTypes = require('prop-types');


class App extends React.Component {
  // const App = class extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    this.state = {
      itemId: 99,
      itemAvailability: [],
      itemPrice: 5,
      itemCurrency: 'usd'
    };
    // this.getData = this.getData.bind(this);
  }

  // componentDidMount() {
  //   this.getData(this.props.itemId);
  // }

  // getData(itemId) {
  //   if (itemId != 99) {
  //     this.setState({
  //       itemId
  //     });
  //     axios.get(`/availableAt/${itemId}`)
  //       .then(({ data }) => {
  //         this.setState({
  //           itemAvailability: data.itemAvailability
  //         });
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }

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