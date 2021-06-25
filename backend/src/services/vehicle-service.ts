import * as vehicleRepository from "../repositories/vehicles-repository";
import * as userRepository from "../repositories/users-repository";

export async function insertVehicle(vehicleId: string) {
  return vehicleRepository.insertVehicle(vehicleId);
}

export async function isVehiclePresent(vehicleId: string) {
  return vehicleRepository.isVehiclePresent(vehicleId);
}

export async function getVehicleLinkedToUser(userEmail: string) {
  return vehicleRepository.getVehicleLinkedToUser(userEmail);
}

export async function bindUserToVehicle(vehicleId: string, userEmail: string): Promise<boolean> {
  return vehicleRepository.bindUserToVehicle(vehicleId, userEmail);
}

export async function unbindUserFromVehicle(vehicleId: string, userEmail: string): Promise<boolean> {
  return vehicleRepository.unbindUserFromVehicle(vehicleId, userEmail);
}

export async function isVehicleLinkedToUser(vehicleId: string, userEmail: string): Promise<boolean> {
  const userVehicles = (await userRepository.getUserLinkedVehicles(userEmail)).linkedVehicles;
  if (userVehicles && userVehicles.length > 0) {
    return userVehicles.map((veh: any) => veh.vehicleId).includes(vehicleId);
  } else {
    return false;
  }
}

export async function addParkingToVehicle(vehicleId: string, parkingId: string): Promise<boolean> {
  return vehicleRepository.addParkingToVehicle(vehicleId, parkingId);
}

export async function removeParkingFromVehicle(vehicleId: string) {
  return vehicleRepository.removeParkingFromVehicle(vehicleId);
}

export async function getVehicleParkingSpot(vehicleId: string) {
  return vehicleRepository.getVehicleParkingSpot(vehicleId);
}