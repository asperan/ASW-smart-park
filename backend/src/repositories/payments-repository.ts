import { mongoClient } from "../services/mongo-client";

export async function addPayment(userEmail: string, parkingId: string, date: Date, amount: number): Promise<boolean> {
  return (await mongoClient.db.collection("payments").insertOne({userEmail: userEmail, parkingId: parkingId, date: date, amount: amount, pending: true})).result.ok === 1;
}

export async function resolvePendingPayment(userEmail: string, parkingId: string, date: Date): Promise<boolean> {
  return (await mongoClient.db.collection("payments").updateOne({userEmail: userEmail, parkingId: parkingId, date: date, pending: true}, {$set: {pending: false}})).result.ok === 1;
}