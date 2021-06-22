import * as paymentRepository from "../repositories/payments-repository";

// TODO: On payment add remainder notifications
export async function addPayment(email: string, parkingId: string, date: Date, amount: number): Promise<boolean> {
  return paymentRepository.addPayment(email, parkingId, date, amount);
}

export async function resolvePendingPayment(email: string, parkingId: string, date: Date): Promise<boolean> {
  return paymentRepository.resolvePendingPayment(email, parkingId, date);
}