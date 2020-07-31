# deliver-pickup

## Related Projects

- https://github.com/PetToyCo/mainTitle_price

## Table of Contents
  1. Usage
  2. Endpoints
  3. Proxy Integration

## Usage

Please Note: This service is currently in Production mode.
if you need to return it to development mode, go to config.js file, comment aws configuration and uncomment the local one.

This service is meant to be used with a proxy server. If that is your intended use:

- run `npm install` inside the photo-gallery directory to install dependencies
- run `npm run seed` (to seed the database)
- run `npm test` (to test seeding script, api endpoints and react components)
- start your application with two commands, `npm run client` and `npm start`, in two separate terminal tabs

If you need to use this service as standalone:

- follow all steps above
- visit http://127.0.0.1:3006/ in a browser
- add a query string parameter `itemID` to your url. Pick itemID within the range 100 - 199.
Example: `http://127.0.0.1:3006/?itemID=106`

## Endpoints:

This service has one endpoint. Endpoint retrieves array of stores and item availability. To retrieve data for a specific item, navigate to:

Go to http://localhost:3006/availableAt/:itemId/

JSON response format:

{"itemAvailability":[{"storeName":"N Walnut Creek","storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598","storePhoneNumber":"925-433-4194","availability":true},{"storeName":"Walnut Creek","storeAddress":"1301 S. California Blvd Walnut Creek, CA 94596-5124","storePhoneNumber":"925-988-9370","availability":true},{"storeName":"Concord","storeAddress":"1150 Concord Ave Suite 160 Concord, CA 94520","storePhoneNumber":"925-356-0217","availability":true},{"storeName":"Martinez","storeAddress":"1170 Arnold Drive No. 115 Martinez, CA 94553","storePhoneNumber":"925-370-6060","availability":false},{"storeName":"San Ramon","storeAddress":"2005 Crow Canyon PI San Ramon, CA 94583-1361","storePhoneNumber":"925-275-2111","availability":true}]}

## Proxy Integration

To use this service with a proxy server, please add `<div id="itemAvailability"></div>` in index.html of your proxy server, and please add <script type="text/javascript" src="http://localhost:3006/bundle.js"></script> near the bottom of the same file. Also you will need to place `<link rel="stylesheet" href="http://localhost:3006/style.css"></link>` file in the head of your html file.
