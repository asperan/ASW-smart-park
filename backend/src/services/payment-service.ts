import * as paymentRepository from "../repositories/payments-repository";

// TODO: On payment add remainder notifications
export async function addPermanence(email: string, parkingId: string, date: Date, amount: number): Promise<boolean> {
  return paymentRepository.addPermanence(email, parkingId, date, amount);
}

export async function resolvePendingPayment(email: string, parkingId: string, date: Date): Promise<boolean> {
  return paymentRepository.resolvePendingPayment(email, parkingId, date);
}