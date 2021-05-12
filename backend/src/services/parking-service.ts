import * as geoService from "./geo-service";
import * as citiesRepository from "../repositories/cities-repository";
import { ParkingEntity } from "../repositories/cities-repository";
import { Coordinates } from "./geo-service";

export function findAvailableParkingByCityId(name: String): Promise<ParkingEntity[]> {
    return citiesRepository.getCityByName(name).then(city => {
        return city.parkings;
    });
}

export async function findAvailableParkingByCityIdWithinRadiusFromCityCenter(name: String, radiusKm: number): Promise<ParkingEntity[]> {
    return citiesRepository.getCityByName(name).then(city => {
        return city.parkings.filter((parking: ParkingEntity) => {
            const center = { longitude: city.longitude, latitude: city.latitude };
            const point =  { longitude: parking.longitude, latitude: parking.latitude };
            return isPointInRadius(center, point, radiusKm)
        });
    });
}

export async function findAvailableParkingByCityIdWithinRadiusFromPoint(name: String, center: Coordinates, radiusKm: number): Promise<ParkingEntity[]> {
    return citiesRepository.getCityByName(name).then(city => {
        return city.parkings.filter((parking: ParkingEntity) => {
            const point = { longitude: parking.longitude, latitude: parking.latitude };
            return isPointInRadius(center, point, radiusKm)
        });
    });
}

function isPointInRadius(center: Coordinates, point: Coordinates, radiusKm: number) {
    return geoService.getDistanceFromLatLonInKm(center, point) <= radiusKm;
}