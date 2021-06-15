import express from "express";
import * as userService from "../services/user-service";
import * as paymentService from "../services/payment-service";
import { checkAccessToken } from "../services/user-auth";

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

export function addUserPayment(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, 
    (email: string) => paymentService.addPayment(email, request.body.parkingId, request.body.date, request.body.amount)
    .then(ok => {
      if (ok) { response.status(200).json({code: 0, message: "Pending payment added."}); } 
      else { response.status(400).json({code: 1, message: "Failed to create a new pending payment."}); }
    }));
}

export function resolvePendingPayment(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, 
    (email: string) => paymentService.resolvePendingPayment(email, request.body.parkingId, request.body.date)
    .then(ok => {
      if (ok) { response.status(200).json({code: 0, message: "Pending payment resolved."}); } 
      else { response.status(400).json({code: 1, message: "Failed to resolve the selected payment."}); }
    }));
}

export function getUserStatistics(request: express.Request, response: express.Response) {
  checkAccessToken(request, response,
    (email: string) => userService.getUserStatistics(email).then(data => response.status(200).json(data)));
}

export function updateLastNotificationCheck(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, 
    (email: string) => userService.updateLastNotificationCheck(email, new Date(request.body.date))
    .then(ok => {
      if (ok) { response.status(200).json({code: 0, message: "Date updated."}); }
      else { response.status(400).json({code: 1, message: "Failed to update the date."}); }
  }));
}

export function updateUserSubscription(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, (email: string) => {
    if (request.body.subscription) {
      userService.updateUserSubscription(email, request.body.subscription).then(ok => {
        if (ok) { response.status(200).json({ code: 0, message: "Subscription updated." }); }
        else { response.status(400).json({ code: 1, message: "Failed to update subscription" }); }
      });
    } else { response.status(400).json({ code: 1, message: "Subscription object not sent." }); }
  });
}