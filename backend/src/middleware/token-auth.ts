import express from "express";
import { isJwtCorrect } from "../services/user-auth";

export function validateAccessToken(request: express.Request, response: express.Response, next: any) {
    const accessToken = request.header("x-access-token");
    if (accessToken) {
      const result = isJwtCorrect(accessToken);
      if (result.ok && result.email) {
        request.userEmail = result.email;
        next();
      } else {
        response.status(401).json({message: "Unauthorized" });
        throw "Unauthorized";
      }
    } else {
      response.status(401).json({message: "Unauthorized" });
        throw "Unauthorized";
    }
}