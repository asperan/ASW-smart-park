import * as notificationRepository from "../repositories/notifications-repository";
import * as userRepository from "../repositories/users-repository";

export async function getUserNotifications(userEmail: string, limit?: number) {
  return notificationRepository.getUserNotifications(userEmail, limit);
}

export async function countUnreadNotifications(userEmail: string) {
  const lastCheckDate = new Date(await userRepository.getLastNotificationCheck(userEmail));
  return notificationRepository.countUnreadNotifications(userEmail, lastCheckDate);
}