import express from "express";
import { addUserPayment, getBasicUserInfo, getUserPaymentsInfo, getUserStatistics, getVehicleUserInfo, postUserVehicle, resolvePendingPayment } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.get("/api/user-info/basic", getBasicUserInfo);
  app.get("/api/user-info/vehicles", getVehicleUserInfo)
     .post("/api/user-info/vehicles", postUserVehicle);
  app.get("/api/user-info/payments", getUserPaymentsInfo)
  .post("/api/user-info/payments", addUserPayment)
  .put("/api/user-info/payments", resolvePendingPayment);
  app.get("/api/user-info/stats", getUserStatistics);
}