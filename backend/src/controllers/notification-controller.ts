import express from "express";
import * as notificationService from "../services/notification-service";

export function getUserNotificationSummary(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    const limit = 20;
    notificationService.getUserNotifications(request.userEmail, limit).then(values => response.status(200).json({ code: 0, notifications: values }));
  }
}

export function getAllUserNotifications(request: express.Request, response: express.Response) {
  if (request.userEmail) notificationService.getUserNotifications(request.userEmail).then(values => response.status(200).json({ code: 0, notifications: values }));
}

export function getUserUnreadNotifications(request: express.Request, response: express.Response) {
  if (request.userEmail) notificationService.countUnreadNotifications(request.userEmail).then(num => response.status(200).json({ code: 0, count: num }));
}
