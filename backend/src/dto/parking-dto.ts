import { Coordinates } from "../data/Coordinates";
import { Parking } from "../models/parking-model";

export class ParkingDto {

    idParking: number;
    currentOccupancy: number;
    coordinates: Coordinates;

    constructor(idParking: number, currentOccupancy: number, coordinates: Coordinates ) {
        this.idParking = idParking;
        this.currentOccupancy = currentOccupancy;
        this.coordinates = this.coordinates = coordinates;
    }

    static fromModel(parking: Parking): ParkingDto {
        return new ParkingDto(parking.idParking, parking.currentOccupancy, parking.coordinates);
    }
}