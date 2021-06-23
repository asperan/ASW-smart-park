import * as paymentRepository from "../repositories/payments-repository";

// TODO: On payment add remainder notifications
export async function addPermanence(email: string, vehicleId: string,  parkingId: string, entryDate: Date, payedUntil: Date, payment: {paymentId: string, amount: number}): Promise<boolean> {
  return paymentRepository.addPermanence(email, vehicleId, parkingId, entryDate, payedUntil, payment);
}

export async function resolvePendingPayment(email: string, parkingId: string, date: Date): Promise<boolean> {
  return paymentRepository.resolvePendingPayment(email, parkingId, date);
}