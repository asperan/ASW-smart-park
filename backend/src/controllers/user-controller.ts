import express from "express";
import * as userService from "../services/user-service";
import * as paymentService from "../services/payment-service";
import * as vehicleService from "../services/vehicle-service";

export function getBasicUserInfo(request: express.Request, response: express.Response) {
  response.status(200).json({ code: 0, email: request.userEmail });
}

export function getVehicleUserInfo(request: express.Request, response: express.Response) {
  if (request.userEmail) userService.getVehicleUserInfo(request.userEmail).then(data => response.status(200).json(data));
}

export function postUserVehicle(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.vehicleId && request.body.vehicleName) {
      userService.addUserVehicle(request.userEmail, request.body.vehicleId, request.body.vehicleName).then(result => {
        switch (result) {
          case 1:
            response.status(201).json({ code: 0, message: "Vehicle linked to user." });
            break;
          case 2:
            response.status(200).json({ code: 0, message: "Vehicle already linked to user" });
            break;
          default:
            response.status(400).json({ code: 1, message: "Failed to link vehicle to user." });
            break;
        }
      });
    } else {
      response.status(400).json({ code: 1, message: "Invalid form parameters." });
    }
  }
}

export function deleteUserVehicle(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.vehicleId) {
      userService.removeUserVehicle(request.userEmail, request.query.vehicleId as string).then(ok => {
        if (ok) { response.status(200).json({ code: 0, message: "Vehicle removed." }); }
        else { response.status(400).json({ code: 1, message: "Failed to remove vehicle" }); }
      });
    } else {
      response.status(400).json({code: 1, message: "Vehicle id not sent."});
    }
  }
}

export function getUserPermanencesInfo(request: express.Request, response: express.Response) {
  if (request.userEmail) userService.getUserPermanencesInfo(request.userEmail).then(data => response.status(200).json(data));
}

export function addUserPermanence(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.entryDate && request.body.payedForMillis && request.body.paymentId && request.body.amount) {
      vehicleService.getVehicleLinkedToUser(request.userEmail).then(vehicle => {
        const vehicleId = vehicle.id;
        const parkingId = vehicle.parkingId;
        const entryDate = new Date(request.body.entryDate);
        const payedUntilDate = new Date(entryDate.valueOf() + request.body.payedForMillis);
        paymentService.addPermanence(request.userEmail as string, vehicleId, parkingId, request.body.entryDate, payedUntilDate, { paymentId: request.body.paymentId, amount: request.body.amount })
          .then(ok => {
            if (ok) { response.status(200).json({ code: 0, message: "Pending payment added." }); }
            else { response.status(400).json({ code: 1, message: "Failed to create a new pending payment." }); }
          });
      });
    } else {
      response.status(400).json({code: 1, message: "Request body is missing arguments."});
    }
  }
}

export function getUserStatistics(request: express.Request, response: express.Response) {
  if(request.userEmail) userService.getUserStatistics(request.userEmail).then(data => response.status(200).json(data));
}

export function updateLastNotificationCheck(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.date) {
      userService.updateLastNotificationCheck(request.userEmail, new Date(request.body.date))
        .then(ok => {
          if (ok) { response.status(200).json({ code: 0, message: "Date updated." }); }
          else { response.status(400).json({ code: 1, message: "Failed to update the date." }); }
        });
    } else {
      response.status(400).json({code: 1, message: "Request body is missing arguments"});
    }
  }
}

export function updateUserSubscription(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.subscription) {
      userService.updateUserSubscription(request.userEmail, request.body.subscription).then(ok => {
        if (ok) { response.status(200).json({ code: 0, message: "Subscription updated." }); }
        else { response.status(400).json({ code: 1, message: "Failed to update subscription" }); }
      });
    } else { response.status(400).json({ code: 1, message: "Subscription object not sent." }); }
  }
}

export function getVehicleLinkedToUser(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    vehicleService.getVehicleLinkedToUser(request.userEmail).then(vehicle => {
      response.status(200).json({ code: 0, vehicleId: vehicle ? vehicle.id : "" });
    });
  }
}

export function linkUserToVehicle(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    if (request.body.vehicleId) {
      vehicleService.bindUserToVehicle(request.body.vehicleId, request.userEmail).then(ok => {
        if (ok) { response.status(200).json({ code: 0, message: "User and vehicle linked successfully." }); }
        else { response.status(400).json({ code: 1, message: "Failed to link user and vehicle." }); }
      });
    } else {
      response.status(400).json({code: 1, message: "Vehicle id not sent."});
    }
  }
}

export function unlinkUserFromVehicle(request: express.Request, response: express.Response) {
  if (request.userEmail && request.query.vehicleId) {
    vehicleService.unbindUserFromVehicle(request.query.vehicleId as string, request.userEmail).then(ok => {
      if (ok) { response.status(200).json({ code: 0, message: "User and vehicle unlinked successfully." }); }
      else { response.status(400).json({ code: 1, message: "Failed to unlink user and vehicle." }); }
    });
  }
}