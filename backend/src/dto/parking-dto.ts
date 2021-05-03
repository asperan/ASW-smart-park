import { Coordinates } from "../data/Coordinates";
import { Parking } from "../models/parking-model";

export class ParkingDto {

    currentOccupancy: number;
    coordinates: Coordinates;

    constructor(currentOccupancy: number, coordinates: Coordinates ) {
        this.currentOccupancy = currentOccupancy;
        this.coordinates = this.coordinates = coordinates;
    }

    static fromModel(parking: Parking): ParkingDto {
        return new ParkingDto(parking.currentOccupancy, parking.coordinates);
    }
}