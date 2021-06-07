export type SignError = None | Common | UpError | InError;
export const enum None {
  None = 0
}
export const enum Common {
  ServerError = 1         // Server error -> other problems
}
export const enum UpError {
  BadFormat = 2,          // Bad request -> email or password have bad format
  EmailAlreadyUsed = 3,   // Bad request -> email is already used
}
export const enum InError {
  BadCredentials = 4,     // Bad request -> credentials are not matching
}

export const errorMessages: Array<string> = [
  "",
  "The server encountered an error. Please try again in a while.",
  `Check the inserted email and password:<br/>
  Your email is not well formatted.<br/>
  OR<br/>
  Your password is not considered secure by our standards.<br/>
  The password must have: <br/>
  * minimum eight characters<br/>
  * at least one upper case English letter<br/>
  * one lower case English letter<br/>
  * one number and one special character<br/>
  `,
  "The inserted email is already taken. Please use another email to sign up.",
  "The inserted credentials do not match to an existing user/password entry. Please check the inserted email and password.",
];