import { validateNotNull } from "../common/validation";
import * as geoService from "./geo-service";
import * as parkingsRepository from "../repositories/parkings-repository";
import * as citiesRepository from "../repositories/cities-repository";

export async function findAvailableParkingByCityId(cityId: number): Promise<parkingsRepository.ParkingEntity[]> {
    return await parkingsRepository.findParkingsByCityId(cityId);
}

export async function findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Promise<parkingsRepository.ParkingEntity[]> {
    const city = await citiesRepository.getCityById(cityId);
    validateNotNull(city, `City ${cityId} Not Found`);
    const parkings = await parkingsRepository.findParkingsByCityId(cityId);
    return parkings.filter((p: parkingsRepository.ParkingEntity) => isPointInRadius({ longitude: city.longitude, latitude: city.latitude }, { longitude: p.longitude, latitude: p.latitude }, radiusKm));
}

export async function findAvailableParkingByCityIdWithinRadiusFromPoint(cityId: number, center: geoService.Coordinates, radiusKm: number): Promise<parkingsRepository.ParkingEntity[]> {
    const parkings = await parkingsRepository.findParkingsByCityId(cityId);
    return parkings.filter((p: parkingsRepository.ParkingEntity) => isPointInRadius(center, { longitude: p.longitude, latitude: p.latitude }, radiusKm));
}

function isPointInRadius(center: geoService.Coordinates, point: geoService.Coordinates, radiusKm: number) {
    return geoService.getDistanceFromLatLonInKm(center, point) <= radiusKm;
}