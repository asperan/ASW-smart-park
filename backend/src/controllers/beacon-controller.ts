import * as beaconService from "../services/beacon-service";

export async function beaconEntry(vehicleId: string, spotId: string, userEmail: string) {
  await beaconService.beaconEntry(vehicleId, spotId, userEmail);
}

export async function beaconExit(vehicleId: string, spotId: string, userEmail: string) {
  await beaconService.beaconExit(vehicleId, spotId, userEmail);
}