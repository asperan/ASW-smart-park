import express from "express";
import * as notificationService from "../services/notification-service";

export function getUserNotificationSummary(request: express.Request, response: express.Response) {
  if (request.userEmail) {
    const limit = 20;
    notificationService.getUserNotifications(request.userEmail, limit).then(values => response.status(200).json({code: 0, notifications: values}));
  }
}

export function getAllUserNotifications(request: express.Request, response: express.Response) {
  if (request.userEmail) notificationService.getUserNotifications(request.userEmail).then(values => response.status(200).json({code: 0, notifications: values}));
}

export function getUserUnreadNotifications(request: express.Request, response: express.Response) {
  if (request.userEmail) notificationService.countUnreadNotifications(request.userEmail).then(num => response.status(200).json({code: 0, count: num}));
}

// TODO: remove function, it is used only for debugging purpose
export function sendNotification(request: express.Request, response: express.Response) {
  // const notificationPayload = notificationService.buildRemainderNotificationPayload("Your parking expires in 5 minutes", {} ); 
  // const notificationPayload = notificationService.buildGotoNotificationPayload("Entered on a parking spot", "pay-parking", {"parkingId": "parcheggio1"});
  const notificationPayload = notificationService.buildGotoNotificationPayload("Look at your notification!", "notifications", {});
  notificationService.sendNotification(request.body.userEmail, notificationPayload).then(result => {
    response.status(200).json({ code: 0, message: "Notification sent," });
  }).catch(reason => {
    response.status(400).json({ code: 1, message: "Failed to send notification." });
  });
}