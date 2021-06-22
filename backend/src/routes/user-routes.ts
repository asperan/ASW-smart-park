import express from "express";
import { addUserPayment, deleteUserVehicle, getBasicUserInfo, getUserPaymentsInfo, getUserStatistics, getVehicleLinkedToUser, getVehicleUserInfo, linkUserToVehicle, postUserVehicle, resolvePendingPayment, unlinkUserFromVehicle, updateLastNotificationCheck, updateUserSubscription } from "../controllers/user-controller";
import { validateAccessToken } from "../middleware/token-auth";

export function setUserRoutes(app: express.Application): void {
  app.get("/api/user/info-basic", validateAccessToken, getBasicUserInfo);
  app.route("/api/user/info-vehicles").all(validateAccessToken)
     .get(getVehicleUserInfo)
     .post(postUserVehicle)
     .delete(deleteUserVehicle);
  app.route("/api/user/info-payments").all(validateAccessToken)
     .get(getUserPaymentsInfo)
     .post(addUserPayment)
     .put(resolvePendingPayment);
  app.route("/api/user/linked-vehicle").all(validateAccessToken)
     .get(getVehicleLinkedToUser)
     .post(linkUserToVehicle)
     .delete(unlinkUserFromVehicle);
  app.get("/api/user/info-stats", validateAccessToken, getUserStatistics);
  app.post("/api/user/update-last-notification-check", validateAccessToken, updateLastNotificationCheck);
  app.post("/api/user/subscription", validateAccessToken, updateUserSubscription);
}