import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../react-client/src/index.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('deliverPickup', () => {

  let available = {"itemAvailability":[
    {"storeName":"N Walnut Creek","storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598","storePhoneNumber":"925-433-4194","availability":true},
    {"storeName":"Walnut Creek","storeAddress":"1301 S. California Blvd Walnut Creek, CA 94596-5124","storePhoneNumber":"925-988-9370","availability":false},
    {"storeName":"Concord","storeAddress":"1150 Concord Ave Suite 160 Concord, CA 94520","storePhoneNumber":"925-356-0217","availability":true},
    {"storeName":"Martinez","storeAddress":"1170 Arnold Drive No. 115 Martinez, CA 94553","storePhoneNumber":"925-370-6060","availability":true},
    {"storeName":"San Ramon","storeAddress":"2005 Crow Canyon PI San Ramon, CA 94583-1361","storePhoneNumber":"925-275-2111","availability":false}]}

  it('should render the main image', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    expect(wrapper.find('img.galleryMainImage').prop('src')).toEqual('https://images.unsplash.com/photo-1?w=400');
  });

  it('should render small images', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    expect(wrapper.find('img.gallerySmallImage')).toHaveLength(2);
  });

  it('should render the large image', () => {
    const wrapper = shallow(<Gallery itemImages={testImages} />);
    wrapper.find('img.galleryMainImage').simulate('mouseEnter', {nativeEvent: {offsetX: 10, offsetY: 20}});
    expect(wrapper.state('preview')).toBe(true);
  });


})
