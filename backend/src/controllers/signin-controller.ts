import express from "express";
import * as userService from "../services/user-service";
import * as userAuth from "../services/user-auth";

export function signinUser(request : express.Request, response: express.Response) {
  if (request.body.email && request.body.password) {
    const userEmail = request.body.email;
    const userPassword = request.body.password;
    userService.checkUserPassword(userEmail, userPassword).then(ok => {
      if (ok) {
        response.status(200).json({ code: 0, message: "Signed in successfully", access_token: userAuth.generateNewJwt(userEmail) });
      } else {
        response.status(400).json({ code: 4, message: "User/password match not found" });
      }
    });
  } else {
    response.status(400).json({ code: 2, message: "User/password not sent." });
  }
}