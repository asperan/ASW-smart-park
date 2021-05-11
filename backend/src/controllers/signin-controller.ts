import express from "express";
import { checkUserPassword } from "../common/mongo-client";

export function signinUser(request : express.Request, response: express.Response) {
  const userEmail = request.body.email;
  const userPassword = request.body.password;
  checkUserPassword(userEmail, userPassword).then(ok => {
    if(ok) {
      response.status(500).json({code: 1, message: "Not implemented."});
      // TODO:
      // Create jwt token
      // Return JWT token
    } else {
      response.status(400).json({code: 4, message: "User/password match not found"});
    }
  });
}