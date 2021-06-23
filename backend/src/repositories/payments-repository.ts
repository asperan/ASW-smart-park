import { mongoClient } from "../services/mongo-client";

export async function addPermanence(userEmail: string, vehicleId: string, parkingSpotId: string, entryDate: Date, payedUntil: Date, payment: {paymentId: string, amount: number}): Promise<boolean> {
  return (await mongoClient.db.collection("parkingstays").insertOne({userEmail: userEmail, vehicleId: vehicleId, parkingSpotId: parkingSpotId, entryDate: entryDate, payedUntil: payedUntil, payment: payment})).result.ok === 1;
}

export async function resolvePendingPayment(userEmail: string, parkingId: string, date: Date): Promise<boolean> {
  return (await mongoClient.db.collection("payments").updateOne({userEmail: userEmail, parkingId: parkingId, date: date, pending: true}, {$set: {pending: false}})).result.ok === 1;
}

export async function getUserPermanences(email: string): Promise<any[]> {
  return await mongoClient.db.collection("parkingstays").find({ userEmail: email }).sort("entryDate", -1).toArray();
}

export async function endPermanence(userEmail: string, vehicleId: string, parkingSpotId: string, exitDate: Date): Promise<boolean> {
  return (await mongoClient.db.collection("parkingstays").findOneAndUpdate({ userEmail: userEmail, vehicleId: vehicleId, parkingSpotId: parkingSpotId, exitDate: null }, { $set: { exitDate: exitDate } })).ok === 1;
}