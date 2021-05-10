
import { ParkingEntity } from "../repositories/parkings-repository";
import { Coordinates } from "../services/geo-service";
import * as parkingService from "../services/parking-service";

export async function getParkingInCity(cityId: number): Promise<any[]> {
    return parkingService.findAvailableParkingByCityId(cityId).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

export async function getParkingInCityIdWithinRadiusFromPoint(cityId: number, center: Coordinates, radiusKm: number): Promise<any[]> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromPoint(cityId, center, radiusKm).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

export async function getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Promise<any[]> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm).then((parkings: ParkingEntity[]) => {
        return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
    });
}

function makeDtoFromParking(parking: ParkingEntity) {
    return {
        id: parking.id,
        cityId: parking.cityId,
        maxOccupancy: parking.maxOccupancy,
        currentOccupancy: parking.currentOccupancy,
        longitute: parking.longitude,
        latitude: parking.latitude
    };
}
