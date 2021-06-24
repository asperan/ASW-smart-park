import { citiesService } from "./city-service";
import * as vehicleService from "./vehicle-service";
import * as notificationService from "./notification-service";
import { endPermanence } from "./payment-service";

export type VehicleMessage = {
  vehicleId: string,
  spotId: number,
  userEmail: string,
  operation: string,
};

export async function beaconEntry(vehicleId: string, spotId: string, userEmail: string) {
  await validateVehicleIsBoundToUser(vehicleId, userEmail);
  await vehicleService.addParkingToVehicle(vehicleId, spotId);
  await citiesService.updateParkingSpotBeaconEntry(spotId);
  await sendPushNotification(userEmail, spotId);
}

export async function beaconExit(vehicleId: string, spotId: string, userEmail: string) {
  await validateVehicleIsBoundToUser(vehicleId, userEmail);
  await validateVehicleInSpot(vehicleId, spotId);
  await vehicleService.removeParkingFromVehicle(vehicleId);
  await citiesService.updateParkingSpotBeaconExit(spotId);
  await endPermanence(userEmail, vehicleId, spotId, new Date());
}

async function validateVehicleIsBoundToUser(vehicleId: string, userEmail: string) {
  const isVehicleBound = await vehicleService.isVehicleLinkedToUser(vehicleId, userEmail);
  if (!isVehicleBound) {
    console.error("Vehicle is not bound to user");
    throw new Error("Vehicle is not bound to user");
  }
  return;
}

async function validateVehicleInSpot(vehicleId: string, spotId: string) {
  const vehicle = await vehicleService.getVehicleParkingSpot(vehicleId);
  if (vehicle) {
    if (vehicle.parkingId === spotId) {
      return;
    } else {
      throw new Error("Vehicle is not on the given spot.");
    }
  } else {
    throw new Error("Vehicle is not registered.");
  }
}

async function sendPushNotification(userEmail: string, spotId: string) {
  const ids = await citiesService.getCityAndParkingIdFromSpot(spotId);
  const cityId = ids.cityId;
  const parkingId = ids.parkingId;
  const notificationPayload = notificationService.buildGotoNotificationPayload("Parking spotted", "payment/" + cityId + "/" + parkingId, {});
  notificationService.sendNotification(userEmail, notificationPayload);
}