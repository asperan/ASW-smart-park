
import { ParkingEntity } from "../repositories/cities-repository";
import { Coordinates } from "../services/geo-service";
import * as parkingService from "../services/parking-service";

export async function getParkingInCity(name: string): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityId(name)
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

export async function getParkingInCityIdWithinRadiusFromPoint(name: string, center: Coordinates, radiusKm: number): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityIdWithinRadiusFromPoint(name, center, radiusKm);
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

export async function getAvailableParkingByCityIdWithinRadiusFromCityCenter(name: string, radiusKm: number): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(name, radiusKm);
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

function makeDtoFromParking(parking: ParkingEntity) {
    return {
        capacity: parking.capacity,
        occupancy: parking.occupancy,
        longitude: parking.longitude,
        latitude: parking.latitude
    };
}
