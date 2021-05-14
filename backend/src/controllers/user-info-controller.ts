import express from "express";
import { isJwtCorrect } from "../common/user-auth";

export function getBasicUserInfo(request: express.Request, response: express.Response) {
  const accessToken = request.header("x-access-token");
  if (accessToken) {
    const result = isJwtCorrect(accessToken);
    if (result.ok) {
      response.status(200).json({ code: 0, email: result.email });
    } else {
      response.status(400).json({ code: 1, message: "Bad JWT." });
    }
  } else {
    response.status(400).json({ code: 2, message: "JWT not sent." });
  }
}