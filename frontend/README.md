# JWT authentication

Insert into a request the session JWT in the header `x-access-token`, when the requested resource needs permissions.

JWT token is stored in session storage.

To simplify token usage, several utilities were provided:

- in app-routing.module.ts add the following to the route definition to automatically secure the route (i.e. redirect if user isn't logged in): canActivate: `[AuthGuardService]`

- All the http requests made by the httpClient are automatically injected with the currently stored token so no further configuration is required, howerver if a request should need not a token, it is sufficient to add the following header to the call's options: "skip-token"=true