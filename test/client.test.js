import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeliverPickup from '../react-client/src/DeliverPickup.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('deliverPickup', () => {

  let available = {"storeName":"N Walnut Creek","storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598","storePhoneNumber":"925-433-4194","availability":true};
  let notAvailable = {"storeName":"N Walnut Creek","storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598","storePhoneNumber":"925-433-4194","availability":false};
  let price = 9.99;
  let currency = '$';

  it('should display Add to Cart button and Available at: if item is available', () => {
    const wrapper = shallow(<DeliverPickup availability={available} price={price} currency={currency}/>);
    console.log(wrapper.html());
    expect(wrapper.find('.deliverPickupButton').at(1).text()).toEqual('Add to Cart');
    expect(wrapper.find('.itemAvailability').text()).toEqual('Available at:');
  });

  it('should display Not Available button and Not Available at: if item is not available', () => {
    const wrapper = shallow(<DeliverPickup availability={notAvailable} price={price} currency={currency}/>);
    expect(wrapper.find('.deliverPickupButton').at(1).text()).toEqual('Not Available');
    expect(wrapper.find('.itemAvailability').text()).toEqual('Not Available at:');
  });

  it('should display item price and currency', () => {
    const wrapper = shallow(<DeliverPickup availability={notAvailable} price={price} currency={currency}/>);
    expect(wrapper.find('.deliverPickupItemPrice').at(0).text()).toEqual('$9.99');
    expect(wrapper.find('.deliverPickupItemPrice').at(1).text()).toEqual('$9.99');
  })

})
