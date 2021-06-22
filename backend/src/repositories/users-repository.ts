import { mongoClient } from "../services/mongo-client";
import { InsertOneWriteOpResult } from "mongodb";
import { hashPassword } from "../services/user-auth";

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return await mongoClient.db.collection("users").countDocuments({email: email}) > 0;
}

export async function insertNewUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return await mongoClient.db.collection("users").insertOne({email: email, password: hashedPassword, salt: salt, lastNotificationCheck: new Date() ,linkedVehicles: new Array<any>(), userSubscription: {} });
}

export async function checkUserPassword(email: string, password: string): Promise<boolean> {
  const user = await mongoClient.db.collection("users").findOne({email: email});
  if (user) {
      const correctHashedPassword = user.password;
      const userSalt = user.salt;
      const insertedPasswordHash = hashPassword(password, userSalt);
      return correctHashedPassword === insertedPasswordHash;
  } else {
      return false;
  }
}

export async function getLastNotificationCheck(email:string): Promise<any> {
  return (await mongoClient.db.collection("users").findOne({email: email}, { projection: {lastNotificationCheck: 1, _id: 0}}));
}

export async function updateLastNotificationCheck(email: string, date: Date): Promise<boolean> {
  return (await mongoClient.db.collection("users").findOneAndUpdate({email: email}, {$set: {lastNotificationCheck: date}})).ok === 1;
}

export async function getUserLinkedVehicles(email: string): Promise<any> {
  return await mongoClient.db.collection("users").findOne({email: email}, {projection: {linkedVehicles: 1, _id: 0}});
}

export async function isVehicleLinked(email: string, vehicleId: string): Promise <boolean> {
  return (await mongoClient.db.collection("users").findOne({email: email, "linkedVehicles.vehicleId": vehicleId})) != null;
}

export async function linkVehicle(email: string, vehicleId: string, vehicleName: string): Promise<boolean> {
  return (await mongoClient.db.collection("users").findOneAndUpdate({email: email}, {$push: {linkedVehicles: {vehicleId: vehicleId, name: vehicleName}}})).ok === 1;
}

export async function removeUserVehicle(email: string, vehicleId: string): Promise<boolean> {
  return (await mongoClient.db.collection("users").findOneAndUpdate({ email: email }, { $pull: { linkedVehicles: {vehicleId: vehicleId} } })).ok === 1;
}

export async function getUserSubscription(email: string): Promise<any> {
  return mongoClient.db.collection("users").findOne({email: email}, {projection: {userSubscription: 1, _id: 0}});
}

export async function setUserSubscription(email: string, subscription: any): Promise<boolean> {
  return (await mongoClient.db.collection("users").findOneAndUpdate({ email: email }, { $set: { userSubscription: subscription } })).ok === 1;
}