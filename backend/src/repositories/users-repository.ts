import { mongoClient } from "../services/mongo-client";
import { InsertOneWriteOpResult } from "mongodb";
import { hashPassword } from "../services/user-auth";

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return await mongoClient.db.collection("users").countDocuments({email: email}) > 0;
}

export async function insertNewUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return await mongoClient.db.collection("users").insertOne({email: email, password: hashedPassword, salt: salt, lastNotificationCheck: new Date().valueOf() ,linkedVehicles: new Array<any>()});
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
  return (await mongoClient.db.collection("users").findOne({email: email}, { projection: {lastNotificationCheck: 1, _id: 0}})).lastNotificationCheck;
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
