import express from "express";
import { getUserNotificationSummary, getUserUnreadNotifications } from "../controllers/notification-controller";

export function setNotificationRoutes(app: express.Application) {
  app.route("/api/notifications")
     .get(getUserNotificationSummary);

  app.route("/api/notifications/unread")
     .get(getUserUnreadNotifications);
}