import * as notificationRepository from "../repositories/notifications-repository";
import * as userRepository from "../repositories/users-repository";
import webpush from "web-push";
import { getConfig } from "./config";

export function configureWebpush() {
  webpush.setVapidDetails("mailto:support@smart-parking.unibo.it", getConfig().server.vapidPublicKey, getConfig().server.vapidPrivateKey);
}

export async function getUserNotifications(userEmail: string, limit?: number) {
  return notificationRepository.getUserNotifications(userEmail, limit);
}

export async function countUnreadNotifications(userEmail: string) {
  const lastCheckObject = await userRepository.getLastNotificationCheck(userEmail);
  if (lastCheckObject) {
    return notificationRepository.countUnreadNotifications(userEmail, new Date(lastCheckObject.lastNotificationCheck));
  } else { return 0; }
}

export async function sendNotification(userEmail: string, payload: any) {
  await notificationRepository.insertSystemNotification(userEmail, new Date(), payload.notification.body);
  const userSubscription = await userRepository.getUserSubscription(userEmail);
  return webpush.sendNotification(userSubscription.userSubscription, JSON.stringify(payload));
}

export function buildGotoNotificationPayload(message: string, url: string, parameters: any) {
  return {
    "notification": {
      "title": "Smart-Parking",
      "body": message,
      "vibrate": [100, 50, 100],
      "data": {
        "type": "goto",
        "url": url,
        "parameters": parameters,
      },
    }
  };
}

export function buildRemainderNotificationPayload(message: string, parameters: any) {
  return {
    "notification": {
      "title": "Smart-Parking",
      "body": message,
      "vibrate": [100, 50, 100],
      "data": {
        "type": "remainder",
        "parameters": parameters,
      },
    }
  };
}