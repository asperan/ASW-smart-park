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