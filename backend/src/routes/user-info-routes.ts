import express from "express";
import { getBasicUserInfo } from "../controllers/user-info-controller";

export function setUserInfoRoutes(app: express.Application): void {
  app.post("/api/user-info/basic", getBasicUserInfo);
}