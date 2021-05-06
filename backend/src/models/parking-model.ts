import { Coordinates } from "../data/Coordinates";

export type Parking = {

    idParking: number;
    parentCityId: number;
    capacity: number;
    currentOccupancy: number;
    coordinates: Coordinates;
}

export function findParkingsByCityId(cityId: number): Array<Parking> {
    return parkings;
}

const parkings = [
    {
        idParking: 1,
        parentCityId: 1,
        capacity: 20,
        currentOccupancy: 0,
        coordinates: {
            longitude: 44.147660,
            latitude: 12.236731
        }
    },
    {
        idParking: 2,
        parentCityId: 1,
        capacity: 50,
        currentOccupancy: 5,
        coordinates: {
            longitude: 44.144281,
            latitude: 12.238529
        }
    },
    {
        idParking: 3,
        parentCityId: 1,
        capacity: 50,
        currentOccupancy: 5,
        coordinates: {
            longitude: 44.144281,
            latitude: 12.238529
        }
    },
    {
        idParking: 4,
        parentCityId: 1,
        capacity: 100,
        currentOccupancy: 100,
        coordinates: {
            longitude: 44.143680,
            latitude: 12.247764
        }
    }
]
