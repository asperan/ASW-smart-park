import { Coordinates } from "../data/Coordinates";
import { Parking } from "../models/parking-model";

export type ParkingDto = {
    idParking: number,
    currentOccupancy: number,
    coordinates: Coordinates,
}

export function DtoFromModel(parking: Parking): ParkingDto {
    return { idParking: parking.idParking, currentOccupancy: parking.currentOccupancy, coordinates: parking.coordinates };
}