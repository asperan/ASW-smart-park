import { Coordinates } from "../data/Coordinates";
import { ParkingDto, DtoFromModel } from "../dto/parking-dto";
import { Parking } from "../models/parking-model";
import * as parkingService from "../services/parking-service";

export function getParkingInCity(cityId: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityId(cityId).map((p: Parking) => DtoFromModel(p));
}

export function getParkingInCityIdWithinRadiusFromPoint(cityId: number, center: Coordinates, radiusKm: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromPoint(cityId, center, radiusKm).map((p: Parking) => DtoFromModel(p));
}

export function getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId: number, radiusKm: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm).map((p: Parking) => DtoFromModel(p));
}
