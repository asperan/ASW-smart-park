import express from 'express';
import * as signupController from "../controllers/signup-controller";

export function setSignupRoutes(app: express.Application) {
  app.post("/api/auth/signup", signupController.signupUser);
}
