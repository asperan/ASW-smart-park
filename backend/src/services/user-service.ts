import * as userRepository from "../repositories/users-repository";
import { InsertOneWriteOpResult } from "mongodb";
import * as vehicleService from "./vehicle-service";
import { getUserPayments } from "../repositories/payments-repository";

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return userRepository.isUserAlreadyPresent(email);
}

export async function insertNewUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return userRepository.insertNewUser(email, salt, hashedPassword);
}

export async function checkUserPassword(email: string, password: string): Promise<boolean> {
  return userRepository.checkUserPassword(email, password);
}

export async function getVehicleUserInfo(email:string) {
  return userRepository.getUserLinkedVehicles(email);
}

export async function addUserVehicle(email: string, vehicleId: string, vehicleName: string): Promise<number> {
  if (!(await vehicleService.isVehiclePresent(vehicleId))) {
    const vehicleInsertionResult = await vehicleService.insertVehicle(vehicleId);
    if (!vehicleInsertionResult) { return 0; }
  }
  if (!(await isVehicleLinked(email, vehicleId))) {
    const linkVehicleResult = await userRepository.linkVehicle(email, vehicleId, vehicleName);
    if (!linkVehicleResult) { return 0; }
  } else { return 2; } // Vehicle already linked
  return 1; // Everything OK
}

export async function removeUserVehicle(email: string, vehicleId: string) {
  return userRepository.unlinkVehicle(email, vehicleId);
}

export async function isVehicleLinked(email: string, vehicleId: string) {
  return userRepository.isVehicleLinked(email, vehicleId);
}

export async function getUserPaymentsInfo(email: string) {
  return getUserPayments(email);
}

export async function getUserStatistics(email: string): Promise<any> {
  return [{ name: "FirstStat", value: "1" }, { name: "Most payed", value: "150,00" }];
}

export async function updateLastNotificationCheck(email: string, date: Date) {
  return userRepository.updateLastNotificationCheck(email, date);
}

export async function updateUserSubscription(email: string, subscriptionObject: any) {
  return userRepository.setUserSubscription(email, subscriptionObject);
}