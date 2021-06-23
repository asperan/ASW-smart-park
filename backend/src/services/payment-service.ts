import * as paymentRepository from "../repositories/payments-repository";
import * as notificationService from "./notification-service";

const remainderIntervalMinutes = [15, 10, 5, 1, 0];
const notificationTimeouts: Map<string, Array<NodeJS.Timeout>> = new Map();

export async function addPermanence(email: string, vehicleId: string,  parkingId: string, entryDate: Date, payedUntil: Date, payment: {paymentId: string, amount: number}): Promise<boolean> {
  createRemainderNotificationTimeouts(email, entryDate, payedUntil);
  return paymentRepository.addPermanence(email, vehicleId, parkingId, entryDate, payedUntil, payment);
}

export async function endPermanence(email: string, vehicleId: string, parkingSpotId: string, exitDate: Date) {
  deleteRemainingTimeouts(email);
  return paymentRepository.endPermanence(email, vehicleId, parkingSpotId, exitDate);
}

function createRemainderNotificationTimeouts(email: string, entryDate: Date, payedUntil: Date) {
  if (!notificationTimeouts.has(email)) {
    notificationTimeouts.set(email, []);
  }
  remainderIntervalMinutes.forEach(minutes => {
    notificationTimeouts.get(email)?.push(setTimeout(() => {
      notificationService.sendNotification(email, notificationService.buildRemainderNotificationPayload(minutes > 0 ? "Your parking payment expires in " + minutes + "minutes" : "Your parking payment has expired!", {}));
    }, (payedUntil.valueOf() - entryDate.valueOf()) - minutes * 60 * 1000));
  });
}

function deleteRemainingTimeouts(email: string) {
  notificationTimeouts.get(email)?.forEach(timeout => clearTimeout(timeout));
  notificationTimeouts.delete(email);
}