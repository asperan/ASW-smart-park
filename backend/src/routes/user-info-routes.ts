import express from "express";
import { getBasicUserInfo, getVehicleUserInfo } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.post("/api/user-info/basic", getBasicUserInfo);
  app.post("/api/user-info/vehicles", getVehicleUserInfo);
}