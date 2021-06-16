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
  const lastCheckDate = new Date(await userRepository.getLastNotificationCheck(userEmail));
  return notificationRepository.countUnreadNotifications(userEmail, lastCheckDate);
}

export async function sendNotification(userEmail: string, payload: any) {
  const userSubscription = await userRepository.getUserSubscription(userEmail);
  console.log(userSubscription.userSubscription);
  return webpush.sendNotification(userSubscription.userSubscription, JSON.stringify(payload));
}