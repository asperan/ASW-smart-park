import { Parking } from "../models/parking-model";

export class ParkingDto {

    currentOccupancy: number;
    longitude: number;
    latitude: number;

    constructor(currentOccupancy: number, longitude: number, latitude: number) {
        this.currentOccupancy = currentOccupancy;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    static fromModel(parking: Parking): ParkingDto {
        return new ParkingDto(parking.currentOccupancy, parking.latitude, parking.longitude);
    }
}