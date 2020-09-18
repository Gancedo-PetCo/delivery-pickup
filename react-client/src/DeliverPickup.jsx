import React from 'react';

const DeliverPickup = (props) => (
  <div className="deliveryPickupContainers">
    <div className="deliverPickup">
      <div className="deliverPickupHeader">Deliver it To Me</div>
      <div className="deliverPickupItemPrice">{props.currency}{props.price}</div>
      <div className="deliverText">
        <div className="deliveryTruck"></div> Order now to get it by <span className="deliveryDate">Wednesday, August 22</span>
      </div>
      <button className="deliverPickupButton">Add to Cart</button>
      <div className="addToWishlistDiv">
        <a className="addToWishlist">Add to Wishlist</a>
      </div>
    </div>
    <div className="deliverPickup">
      <div className="deliverPickupHeader">I'll Pick It Up</div>
      <div className="cubsidePickup">
        <strong>10% off – See Price in Cart!</strong> Curbside pickup now available in most locations.
      </div>
      <div className="deliverPickupItemPrice">{props.currency}{props.price}</div>
      <div className={`itemAvailability ${props.availability.availability ? 'itemAvailabilityGreen' : 'itemAvailabilityRed'}`}>{props.availability.availability ? "Available at:" : "Not Available at:"}</div>
      <div className="localStoreAvailability">
        <span className="pickupStoreName">{props.availability.store_name.toUpperCase()}</span>
        <a className="changeStore">Change Store</a>
      </div>
      <button disabled={!props.availability.availability} className="deliverPickupButton">{props.availability.availability ? "Add to Cart" : "Not Available"}</button>
    </div>
  </div>
)

export default DeliverPickup;
