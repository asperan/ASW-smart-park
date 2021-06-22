import { mongoClient } from "../services/mongo-client";

function getQueryObjectPrototype(userEmail: string): { [key: string]: any } {
  return { $or: [{ addressees: userEmail }, { addressees: ["ALL"] }] };
}

export async function getUserNotifications(userEmail: string, limit?: number): Promise<any[]> {
  return await mongoClient.db.collection("notifications").find(getQueryObjectPrototype(userEmail), { sort: { date: -1 } }).toArray();
}

export async function countUnreadNotifications(userEmail: string, lastCheckDate: Date): Promise<number> {
  const queryObject = getQueryObjectPrototype(userEmail);
  queryObject.date = { $gt: lastCheckDate };
  return await mongoClient.db.collection("notifications").countDocuments(queryObject);
}

export async function insertSystemNotification(userEmail: string, date: Date, message: string): Promise<boolean> {
  const notificationObject = {
    date: date,
    addressees: [userEmail],
    message: message,
    senderReference: "System",
  };
  return (await mongoClient.db.collection("notifications").insertOne(notificationObject)).result.ok === 1;
}