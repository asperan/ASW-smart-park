import express from "express";
import { checkAccessToken } from "../services/user-auth";
import * as notificationService from "../services/notification-service";

export function getUserNotificationSummary(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, (email: string) => {
    const limit = 20;
    notificationService.getUserNotifications(email, limit).then(values => response.status(200).json({code: 0, notifications: values}));
  });
}

export function getUserUnreadNotifications(request: express.Request, response: express.Response) {
  checkAccessToken(request, response, (email: string) => {
    notificationService.countUnreadNotifications(email).then(num => response.status(200).json({code: 0, count: num}));
  });
}