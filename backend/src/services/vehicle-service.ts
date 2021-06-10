import * as vehicleRepository from "../repositories/vehicles-repository";

export async function insertVehicle(vehicleId:string) {
  return vehicleRepository.insertVehicle(vehicleId);
}

export async function isVehiclePresent(vehicleId: string) {
  return vehicleRepository.isVehiclePresent(vehicleId);
}

export async function bindUserToVehicle(vehicleId: string, userEmail: string): Promise<boolean> {
  return vehicleRepository.bindUserToVehicle(vehicleId, userEmail);
}

export async function unbindUserFromVehicle(vehicleId: string): Promise<boolean> {
  return vehicleRepository.unbindUserFromVehicle(vehicleId);
}

export async function isVehicleBoundToUser(vehicleId: string, userEmail: string): Promise<boolean> {
  return vehicleRepository.isVehicleBoundToUser(vehicleId, userEmail);
}

export async function addParkingToVehicle(vehicleId: string, parkingId: string): Promise<boolean> {
  return vehicleRepository.addParkingToVehicle(vehicleId, parkingId);
}

export async function removeParkingFromVehicle(vehicleId: string) {
  return vehicleRepository.removeParkingFromVehicle(vehicleId);
}