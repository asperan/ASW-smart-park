import { mongoClient } from "../services/mongo-client";

export async function addPermanence(userEmail: string, vehicleId: string, parkingSpotId: string, entryDate: Date, payedUntil: Date, payment: { paymentId: string, amount: number }): Promise<boolean> {
  return (await mongoClient.db.collection("parkingstays").insertOne({ userEmail: userEmail, vehicleId: vehicleId, parkingSpotId: parkingSpotId, entryDate: entryDate, payedUntil: payedUntil, payment: payment })).result.ok === 1;
}

export async function getUserPermanences(email: string): Promise<any[]> {
  return await mongoClient.db.collection("parkingstays").find({ userEmail: email }).sort("entryDate", -1).toArray();
}

export async function endPermanence(userEmail: string, vehicleId: string, parkingSpotId: string, exitDate: Date): Promise<boolean> {
  return (await mongoClient.db.collection("parkingstays").findOneAndUpdate({ userEmail: userEmail, vehicleId: vehicleId, parkingSpotId: parkingSpotId, exitDate: null }, { $set: { exitDate: exitDate } })).ok === 1;
}

export async function countUserPermanences(userEmail: string) {
  return (await mongoClient.db.collection("parkingstays").aggregate([{$match: {userEmail: userEmail}}, {$count: "numOfPermanences"}]).toArray())[0];
}

export async function getMostPayed(userEmail: string) {
  return (await mongoClient.db.collection("parkingstays").aggregate([{$match: {userEmail: userEmail}}, {$group: { _id: null, maxPayment: {$max: "$payment.amount"}}}]).toArray())[0];
}

export async function getUsedVehicles(userEmail: string) {
  return (await mongoClient.db.collection("parkingstays").aggregate([{$match: {userEmail: userEmail}}, {$group: { _id: "$vehicleId", vehicleCount: {$sum: 1}}}]).toArray());
}

export async function getAveragePermanenceTime(userEmail: string) {
  return (await mongoClient.db.collection("parkingstays").aggregate([
    { $match: { userEmail: "as1@live.it", exitDate: { $not: { $eq: null } } } },
    {
      $group: {
        _id: null,
        avgTime: {
          $accumulator: {
            init: "function () { return { count: 0, sum: 0 } }",
            accumulate: "function (state, entryDate, exitDate) { return { count: state.count + 1, sum: state.sum + (exitDate.valueOf() - entryDate.valueOf()) } }",
            accumulateArgs: ["$entryDate", "$exitDate"],
            merge: "function (state1, state2) { return { count: state1.count + state2.count, sum: state1.sum + state2.sum } }",
            finalize: "function (state) { return state.sum / state.count; }",
            lang: "js",
          }
        }
      }
    }]).toArray());
}