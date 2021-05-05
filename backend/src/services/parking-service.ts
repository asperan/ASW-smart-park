import { validateNotNull } from "../common/validation";
import { Coordinates } from "../data/Coordinates";
import * as parkingModel from "../models/parking-model";
import * as cityModel from "../models/city-model";
import * as geoService from "./geo-service";

export function findAvailableParkingByCityId(cityId: number): Array<parkingModel.Parking> {
    return parkingModel.findParkingsByCityId(cityId);
}

export function findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Array<parkingModel.Parking> {
    const city = cityModel.findCityById(cityId);
    validateNotNull(city, `City ${cityId} Not Found`);
    return parkingModel.findParkingsByCityId(cityId).filter((p: parkingModel.Parking) => geoService.getDistanceFromLatLonInKm(city.coordinates, p.coordinates) <= radiusKm);
}

export function findAvailableParkingByCityIdWithinRadiusFromPoint(cityId: number, center: Coordinates, radiusKm: number): Array<parkingModel.Parking> {
    return parkingModel.findParkingsByCityId(cityId).filter((p: parkingModel.Parking) => geoService.getDistanceFromLatLonInKm(center, p.coordinates) <= radiusKm);
}
