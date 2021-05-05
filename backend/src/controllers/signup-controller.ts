import express from "express";

export function signupUser(request: express.Request, response: express.Response) {
  if (checkEmailFormat(request.body.email)
    && checkPasswordFormat(request.body.format)
  ) {
    // Check if user is not present, generate salt and insert new user with hashed password
  } else {
    response.status(400).json({message: "Email or password have not the correct format."});
  }
}

function checkEmailFormat(email: string) {
  const emailFormat = "[a-zA-Z0-9\-\_\.]{1,64}\@[a-zA-Z0-9]+\.[a-z]+";
  return email && checkStringFormat(email, emailFormat);
}

/* As of now username is not needed */
function checkUsernameFormat(username: string) {
  const usernameFormat = "[a-zA-Z0-9\-\_\.]{1,20}";
  return username && checkStringFormat(username, usernameFormat);
}

function checkPasswordFormat(password: string) {
  // Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character 
  const passwordFormat = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$";
  return password && checkStringFormat(password, passwordFormat);
}

function checkStringFormat(string: string, format: string) {
  const matches = string.match(format);
  return matches && matches.includes(string);
}