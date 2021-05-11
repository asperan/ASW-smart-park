export type SignError = None | Common | UpError | InError;
export const enum None {
  None = 0
}
export const enum Common {
  ServerError = 1   // Server error -> other problems
}
export const enum UpError {
  PasswordNotSecure = 2,  // Bad request -> password is not secure
  EmailAlreadyUsed = 3,       // Bad request -> email is already used
}
export const enum InError {
  BadCredentials = 4,   // Bad request -> credentials are not matching
}

export const errorMessages: Array<string> = [
  "",
  "The server encountered an error. Please try again in a while.",
  "Your password is not considered secure by our standards. The password must have: minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character.",
  "The inserted email is already taken. Please use another email to sign up.",
  "The inserted credentials do not match to an existing user/password entry. Please check the inserted email and password.",
];