import { citiesService } from "./city-service";
import * as vehicleService from "./vehicle-service";
import * as notificationService from "./notification-service";

export type VehicleMessage = {
    vehicleId: string
    spotId: number,
    userEmail: string
    operation: string,
}

/* 
TODO 
- Payment
- Statistics
*/
export async function beaconEntry(vehicleId: string, spotId: string, userEmail: string) {
    await validateVehicleIsBoundToUser(vehicleId, userEmail);
    await vehicleService.addParkingToVehicle(vehicleId, spotId);
    await citiesService.updateParkingSpotBeaconEntry(spotId);
}

export async function beaconExit(vehicleId: string, spotId: string, userEmail: string) {
    await validateVehicleIsBoundToUser(vehicleId, userEmail);
    await vehicleService.removeParkingFromVehicle(vehicleId);
    await citiesService.updateParkingSpotBeaconExit(spotId);
}

async function validateVehicleIsBoundToUser(vehicleId: string, userEmail: string) {
    const isVehicleBound = await vehicleService.isVehicleLinkedToUser(vehicleId, userEmail);
    if(!isVehicleBound) {
        console.error("Vehicle is not bound to user");
        throw new Error("Vehicle is not bound to user");
    }
    return;
}