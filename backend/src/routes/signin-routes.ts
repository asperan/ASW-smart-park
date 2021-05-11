import express from 'express';
import * as signinController from "../controllers/signin-controller";

export function setSigninRoutes(app: express.Application) {
  app.post("/api/auth/signin", signinController.signinUser);
}
