import express from "express";
import { getBasicUserInfo, getUserPaymentsInfo, getUserStatistics, getVehicleUserInfo, postUserVehicle } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.get("/api/user-info/basic", getBasicUserInfo);
  app.get("/api/user-info/vehicles", getVehicleUserInfo)
     .post("/api/user-info/vehicles", postUserVehicle);
  // TODO: add route to post a new payment
  app.get("/api/user-info/payments", getUserPaymentsInfo);
  app.get("/api/user-info/stats", getUserStatistics);
}