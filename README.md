# deliver-pickup

- run `npm run seed` (to seed the database)
- run `npm test` (to test seeding script, api endpoints and react components)

Go to http://localhost:3006/availableAt/:itemId/

JSON response format:

{"itemAvailability":[{"storeName":"N Walnut Creek","storeAddress":"2820 Ygnacio Valley Rd Walnut Creek, CA 94598","storePhoneNumber":"925-433-4194","availability":true},{"storeName":"Walnut Creek","storeAddress":"1301 S. California Blvd Walnut Creek, CA 94596-5124","storePhoneNumber":"925-988-9370","availability":true},{"storeName":"Concord","storeAddress":"1150 Concord Ave Suite 160 Concord, CA 94520","storePhoneNumber":"925-356-0217","availability":true},{"storeName":"Martinez","storeAddress":"1170 Arnold Drive No. 115 Martinez, CA 94553","storePhoneNumber":"925-370-6060","availability":false},{"storeName":"San Ramon","storeAddress":"2005 Crow Canyon PI San Ramon, CA 94583-1361","storePhoneNumber":"925-275-2111","availability":true}]}
