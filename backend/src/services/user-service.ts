import * as userRepository from "../repositories/users-repository";
import { InsertOneWriteOpResult } from "mongodb";
import * as vehicleService from "./vehicle-service";
import { getUserPermanences } from "../repositories/payments-repository";
import { citiesService } from "./city-service";

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return userRepository.isUserAlreadyPresent(email);
}

export async function insertNewUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return userRepository.insertNewUser(email, salt, hashedPassword);
}

export async function checkUserPassword(email: string, password: string): Promise<boolean> {
  return userRepository.checkUserPassword(email, password);
}

export async function getVehicleUserInfo(email: string) {
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
  return (await userRepository.removeUserVehicle(email, vehicleId)) &&
    (await vehicleService.unbindUserFromVehicle(vehicleId, email));
}

export async function isVehicleLinked(email: string, vehicleId: string) {
  return userRepository.isVehicleLinked(email, vehicleId);
}

export async function getUserPermanencesInfo(email: string) {
  const permanences = await getUserPermanences(email);
  const infos = [];
  for (const permanence of permanences) {
    if (permanence.parkingSpotId) {
      infos.push({
        parkingAddress: (await citiesService.getParkingDetailFromSpot(permanence.parkingSpotId)).address,
        entryDate: permanence.entryDate,
        exitDate: permanence.exitDate,
        amountPayed: permanence.payment.amount
      });
    }
  }
  return infos;
}

// TODO: adds statistics
export async function getUserStatistics(email: string): Promise<any> {
  return [{ name: "FirstStat", value: "1" }, { name: "Most payed", value: "150,00" }];
}

export async function updateLastNotificationCheck(email: string, date: Date) {
  return userRepository.updateLastNotificationCheck(email, date);
}

export async function updateUserSubscription(email: string, subscriptionObject: any) {
  return userRepository.setUserSubscription(email, subscriptionObject);
}