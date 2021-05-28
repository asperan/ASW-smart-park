import express from "express";
import * as userService from "../services/user-service";
import * as userAuth from "../services/user-auth";

export function signupUser(request: express.Request, response: express.Response) {
  const userEmail = request.body.email;
  const userPassword = request.body.password;
  if (checkEmailFormat(userEmail)
    && checkPasswordFormat(userPassword)
  ) {
    userService.isUserAlreadyPresent(userEmail).then(value => {
      if (value) {
        response.status(400).json({code: 3, message: "The inserted email is already taken."});
      } else {
        const userSalt = userAuth.generateNewSalt();
        const hashedPassword = userAuth.hashPassword(userPassword, userSalt);
        userService.insertUser(userEmail, userSalt, hashedPassword).then(insertResult => {
          if (insertResult.result.ok) {
            response.status(200).json({code: 0, message: "User signed up correctly."});
          } else {
            response.status(500).json({code: 1, message: "Failed to insert new user."});
          }
        });
      }
    })
  } else {
    response.status(400).json({code: 2, message: "Email or password have not the correct format."});
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