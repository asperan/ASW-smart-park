import * as userRepository from "../repositories/users-repository";
import { InsertOneWriteOpResult } from "mongodb";
import * as vehicleService from "./vehicle-service";
import { getUserPermanences, countUserPermanences, getMostPayed, getUsedVehicles, getAveragePermanenceTime } from "../repositories/payments-repository";
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
        payedUntil: permanence.payedUntil,
        amountPayed: permanence.payment.amount
      });
    }
  }
  return infos;
}

export async function getUserStatistics(email: string): Promise<any> {
  const numOfPermanences = await countUserPermanences(email);
  const mostPayed = await getMostPayed(email);
  const mostUsedVehicles = await getUsedVehicles(email);
  const mostUsedVehicle = mostUsedVehicles.reduce((pv, cv) => cv.vehicleCount > pv.vehicleCount ? cv : pv , {_id: null, vehicleCount: 0});
  const averagePermanenceTime = await getAveragePermanenceTime(email);
  const averageTimeString = averagePermanenceTime.length > 0 ? computeAverageTimeString(averagePermanenceTime[0].avgTime) : "0";
  return [
    { name: "Totale parcheggi", value: "" + numOfPermanences.numOfPermanences}, 
    { name: "Parcheggio più costoso", value: toPriceString(mostPayed.maxPayment) },
    { name: "Veicolo più usato", value: await getVehicleName(email, mostUsedVehicle._id) },
    { name: "Tempo di permanenza medio", value: averageTimeString },
  ];
}

export async function updateLastNotificationCheck(email: string, date: Date) {
  return userRepository.updateLastNotificationCheck(email, date);
}

export async function updateUserSubscription(email: string, subscriptionObject: any) {
  return userRepository.setUserSubscription(email, subscriptionObject);
}

function toPriceString(price: number): string {
  return "" + Math.floor(price / 100) + "." + price % 100 + "€";
}

async function getVehicleName(email: string, vehicleId: string): Promise<string> {
  const linkedVehiclesWithId = (await userRepository.getUserLinkedVehicles(email)).linkedVehicles.filter((vehicle: any) => vehicle.vehicleId === vehicleId);
  if (linkedVehiclesWithId.length > 0) {
    return linkedVehiclesWithId[0].name;
  } else {
    return "Veicolo eliminato";
  }
}

function computeAverageTimeString(millis: number): string {
  const minutes = Math.floor(millis / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return "" + hours + ":" + remainingMinutes + "h";
}