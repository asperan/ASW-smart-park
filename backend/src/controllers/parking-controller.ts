import { Coordinates } from "../data/Coordinates";
import { ParkingDto } from "../dto/parking-dto";
import { Parking } from "../models/parking-model";

const parkingService = require("../services/parking-service");

function getParkingInCity(cityId: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityId(cityId).map((p: Parking) => ParkingDto.fromModel(p));
}

function getParkingInCityIdWithinRadius(cityId: number, center: Coordinates, radiusKm: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityIdWithinRadius(cityId, center, radiusKm).map((p: Parking) => ParkingDto.fromModel(p));
}

function getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm).map((p: Parking) => ParkingDto.fromModel(p));
}

module.exports = {
    getParkingInCity,
    getParkingInCityIdWithinRadius,
    getAvailableParkingByCityIdWithinRadiusFromCityCenter
}