# Smart-Park backend

### Install dependencies
`npm install`

### Add config.json
To add external configuration add config.json to the /config. 
</br>
/config contains a sample config to base your configuration on

### Check JWT
If a resource needs authorization, check the given JWT in the `x-access-token` header with the function `isJwtCorrect` in teh source file `src/common/user-auth.ts`.

### Run backend
`npm start`

### Query examples
#### GET
All queries about a user private information requires their access token, which is given after signing in, to be set in `x-access-token` header.

#### POST
* `/api/auth/signup`: `{email: <email>, password: <password> }`
* `/api/auth/signin`: `{email: <email>, password: <password> }`
* `/api/user/info-vehicles`: `{vehicleId: <vehicleId>, vehicleName: <vehicleName>}`
* `/api/user/info-payments`: `{parkingId: <parkingId>, date: <date-as-unix-timestamp>, amount: <amount-in-cents>}`
* `/api/user/update-last-notification-check`: `{ date: <date-as-unix-timestamp>}`

#### PUT
* `/api/user/info-payments`: `{parkingId: <parkingId>, date: <date-as-unix-timestamp>}`
