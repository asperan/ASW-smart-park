import { Coordinates } from "../data/Coordinates";

export class Parking {

    parentCityId: number;
    capacity: number;
    currentOccupancy: number;
    coordinates: Coordinates;

    constructor(parentCityId: number, capacity: number, currentOccupancy: number, coordinates: Coordinates) {
        this.parentCityId = parentCityId;
        this.capacity = capacity;
        this.currentOccupancy = currentOccupancy;
        this.coordinates = coordinates;
    }
}

// Mocking DB interactions with static objects 
// only temporary until mongo is integrated :)

const parkings = [
    new Parking(1, 20, 0, new Coordinates(44.147660, 12.236731)),
    new Parking(1, 50, 5, new Coordinates(44.144281, 12.238529)),
    new Parking(1, 50, 5, new Coordinates(44.144281, 12.238529)),
    new Parking(1, 100, 100, new Coordinates(44.143680, 12.247764))
]

function findParkingsByCityId(cityId: number): Array<Parking> {
    return parkings;
}

module.exports = {
    findParkingsByCityId
}