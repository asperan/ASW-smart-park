import express from "express";
import { checkUserPassword } from "../common/mongo-client";
import { generateNewJwt } from "../common/user-auth";

export function signinUser(request : express.Request, response: express.Response) {
  const userEmail = request.body.email;
  const userPassword = request.body.password;
  checkUserPassword(userEmail, userPassword).then(ok => {
    if(ok) {
      response.status(200).json({code: 0, message: "Signed in successfully", access_token: generateNewJwt(userEmail)});
    } else {
      response.status(400).json({code: 4, message: "User/password match not found"});
    }
  });
}