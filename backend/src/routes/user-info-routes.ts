import express from "express";
import { addUserPayment, getBasicUserInfo, getUserPaymentsInfo, getUserStatistics, getVehicleUserInfo, postUserVehicle, resolvePendingPayment } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.get("/api/user-info/basic", getBasicUserInfo);
  app.route("/api/user-info/vehicles")
     .get(getVehicleUserInfo)
     .post(postUserVehicle);
  app.route("/api/user-info/payments")
     .get(getUserPaymentsInfo)
     .post(addUserPayment)
     .put(resolvePendingPayment);
  app.get("/api/user-info/stats", getUserStatistics);
}