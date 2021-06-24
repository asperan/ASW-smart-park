import express from "express";
import { getAllUserNotifications, getUserNotificationSummary, getUserUnreadNotifications } from "../controllers/notification-controller";
import { validateAccessToken } from "../middleware/token-auth";

export function setNotificationRoutes(app: express.Application) {
  app.route("/api/notifications")
     .get(validateAccessToken, getUserNotificationSummary);

  app.route("/api/notifications/all")
     .get(validateAccessToken, getAllUserNotifications)

  app.route("/api/notifications/unread")
     .get(validateAccessToken, getUserUnreadNotifications);
}