import { InsertOneWriteOpResult } from "mongodb";
import { mongoClient } from "../services/mongo-client";

export async function insertVehicle(vehicleId: string): Promise<InsertOneWriteOpResult<any>> {
  return await mongoClient.db.collection("vehicles").insertOne({id: vehicleId});
}

export async function isVehiclePresent(vehicleId: string): Promise<boolean> {
  return (await mongoClient.db.collection("vehicles").countDocuments({id: vehicleId})) === 1;
}

export async function getVehicleLinkedToUser(userEmail: string): Promise<any> {
  return await mongoClient.db.collection("vehicles").findOne({userEmail: userEmail});
}

export async function bindUserToVehicle(vehicleId: string, userEmail: string): Promise<boolean> {
  return (await mongoClient.db.collection("vehicles").updateMany({ userEmail: userEmail }, { $unset: { userEmail: "" } })).result.ok === 1 &&
    (await mongoClient.db.collection("vehicles").findOneAndUpdate({ id: vehicleId }, { $set: { userEmail: userEmail } })).ok === 1;
}

export async function unbindUserFromVehicle(vehicleId: string): Promise<boolean> {
  return (await mongoClient.db.collection("vehicles").findOneAndUpdate({id: vehicleId}, {$unset: {userEmail: ""}})).ok === 1;
}

export async function isVehicleBoundToUser(vehicleId: string, userEmail: string): Promise<boolean> {
  const vehicle = await mongoClient.db.collection("vehicles").findOne({id: vehicleId});
  if(vehicle) {
    return vehicle.userEmail == userEmail;
  } else {
    return false;
  }
}

export async function addParkingToVehicle(vehicleId: string, parkingId: string): Promise<boolean> {
  return (await mongoClient.db.collection("vehicles").findOneAndUpdate({id: vehicleId}, {$set: {parkingId: parkingId}})).ok === 1;
}

export async function removeParkingFromVehicle(vehicleId: string) {
  return (await mongoClient.db.collection("vehicles").findOneAndUpdate({id: vehicleId}, {$unset: {parkingId: ""}})).ok === 1;
}