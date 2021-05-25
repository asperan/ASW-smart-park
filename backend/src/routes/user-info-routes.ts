import express from "express";
import { getBasicUserInfo, getUserPaymentsInfo, getUserStatistics, getVehicleUserInfo } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.get("/api/user-info/basic", getBasicUserInfo);
  // TODO: add route to post a new vehicle
  app.get("/api/user-info/vehicles", getVehicleUserInfo);
  // TODO: add route to post a new payment
  app.get("/api/user-info/payments", getUserPaymentsInfo);
  app.get("/api/user-info/stats", getUserStatistics);
}