import express from "express";
import { isJwtCorrect } from "../services/user-auth";
import * as userService from "../services/user-service";

export function getBasicUserInfo(request: express.Request, response: express.Response) {
  checkAccessToken(request, response,
    (email: string) => response.status(200).json({ code: 0, email: email }));
}

export function getVehicleUserInfo(request: express.Request, response: express.Response) {
  checkAccessToken(request, response,
    (email: string) => userService.getVehicleUserInfo(email).then(data => response.status(200).json(data)));
}

export function postUserVehicle(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, 
    (email: string) => userService.addUserVehicle(email, request.body.vehicleId, request.body.vehicleName).then(result => {
      switch (result) {
        case 1:
          response.status(201).json({code: 0, message: "Vehicle linked to user."});  
          break;
        case 2:
          response.status(200).json({code: 0, message: "Vehicle already linked to user"});
          break;
        default:
          response.status(400).json({code: 1, message: "Failed to link vehicle to user."});
          break;
      }
    }));
}

export function getUserPaymentsInfo(request: express.Request, response: express.Response) {
  checkAccessToken(request, response,
    (email: string) => userService.getUserPaymentsInfo(email).then(data => response.status(200).json(data)));
}

export function getUserStatistics(request: express.Request, response: express.Response) {
  checkAccessToken(request, response,
    (email: string) => userService.getUserStatistics(email).then(data => response.status(200).json(data)));
}

function checkAccessToken(request: express.Request, response: express.Response, callback: (email: string) => any) {
  const accessToken = request.header("x-access-token");
  if (accessToken) {
    const result = isJwtCorrect(accessToken);
    if (result.ok && result.email) {
      callback(result.email);
    } else {
      response.status(400).json({ code: 1, message: "Bad JWT." });
    }
  } else {
    response.status(400).json({ code: 2, message: "JWT not sent." });
  }
}