import express from "express";
import { isJwtCorrect } from "../services/user-auth";
import * as userService from "../services/user-service";

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

export function getVehicleUserInfo(request: express.Request, response: express.Response) {
  const accessToken = request.header("x-access-token");
  if (accessToken) {
    const result = isJwtCorrect(accessToken);
    if (result.ok && result.email) {
      userService.getVehicleUserInfo(result.email).then(data => response.status(200).json(data));
    } else {
      response.status(400).json({ code: 1, message: "Bad JWT." });
    }
  } else {
    response.status(400).json({ code: 2, message: "JWT not sent." });
  }
}