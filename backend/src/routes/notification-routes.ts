import express from "express";
import { getAllUserNotifications, getUserNotificationSummary, getUserUnreadNotifications, sendNotification } from "../controllers/notification-controller";

export function setNotificationRoutes(app: express.Application) {
  app.route("/api/notifications")
     .get(getUserNotificationSummary)
     .post(sendNotification); // TODO: remove function, it is used only for debugging purpose

  app.route("/api/notifications/all")
     .get(getAllUserNotifications)

  app.route("/api/notifications/unread")
     .get(getUserUnreadNotifications);
}