
import { ParkingEntity, ParkingSpotEntity } from "../repositories/cities-repository";
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

export async function getParkingSpotsByParkingId(cityName: string, parkingId: number) {
    const parking = await parkingService.findParkingByCityAndParkingId(cityName, parkingId);
    return makeDtoFromParking(parking);
}

function makeDtoFromParking(parking: ParkingEntity) {
    return {
        id: parking.id,
        capacity: parking.capacity,
        occupancy: parking.occupancy,
        longitude: parking.longitude,
        latitude: parking.latitude,
        parkingSpots: parking.parkingSpots
    };
}
