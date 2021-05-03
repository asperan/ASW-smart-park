import { validateNotNull } from "../common/validation";
import { Coordinates } from "../data/Coordinates";
import { Parking } from "../models/parking-model";

const parkingModel = require('../models/parking-model');
const cityModel = require('../models/city-model');
const geoService = require('./geo-service');

function findAvailableParkingByCityId(cityId: number): Array<Parking> {
    return parkingModel.findParkingsByCityId(cityId);
}

function findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Array<Parking> {
    const city = cityModel.findCityById(cityId);
    validateNotNull(city, `City ${cityId} Not Found`);
    return parkingModel.findParkingsByCityId(cityId).filter((p: Parking) => geoService.getDistanceFromLatLonInKm(city.coordinates, p.coordinates) <= radiusKm);
}

function findAvailableParkingByCityIdWithinRadiusFromPoint(cityId: number, center: Coordinates, radiusKm: number): Array<Parking> {
    return parkingModel.findParkingsByCityId(cityId).filter((p: Parking) => geoService.getDistanceFromLatLonInKm(center, p.coordinates) <= radiusKm);
}

module.exports = {
    findAvailableParkingByCityId,
    findAvailableParkingByCityIdWithinRadiusFromCityCenter,
    findAvailableParkingByCityIdWithinRadiusFromPoint
}