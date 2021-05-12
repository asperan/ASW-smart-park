
import { ParkingEntity } from "../repositories/cities-repository";
import { Coordinates } from "../services/geo-service";
import * as parkingService from "../services/parking-service";

export async function getParkingInCity(name: string): Promise<any[]> {
    return parkingService.findAvailableParkingByCityId(name).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

export async function getParkingInCityIdWithinRadiusFromPoint(name: string, center: Coordinates, radiusKm: number): Promise<any[]> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromPoint(name, center, radiusKm).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

export async function getAvailableParkingByCityIdWithinRadiusFromCityCenter(name: string, radiusKm: number): Promise<any[]> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(name, radiusKm).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

function makeDtoFromParking(parking: ParkingEntity) {
    return {
        capacity: parking.capacity,
        occupancy: parking.occupancy,
        longitude: parking.longitude,
        latitude: parking.latitude
    };
}
