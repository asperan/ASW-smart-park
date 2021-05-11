import express from "express";
import { isUserAlreadyPresent } from "../common/mongo-client";

export function signinUser(request : express.Request, response: express.Response) {
  const userEmail = request.body.email;
  const userPassword = request.body.password;
  // TODO: abstract user presence check
  // checkUserPassword(userEmail, userPassword).then(ok => ...)
  isUserAlreadyPresent(userEmail).then(ok => {
    if(ok) {
      response.status(500).json({code: 1, message: "Not implemented."});
      // TODO:
      // Check password
      // Create jwt token
      // Return JWT token
    } else {
      response.status(400).json({code: 4, message: "User/password match not found"});
    }
  });
}