import { mongoClient } from "../common/mongo-client";

export type ParkingEntity = {
    id: number,
    cityId: number,
    maxOccupancy: number,
    currentOccupancy: number,
    longitude: number,
    latitude: number
}

export function findParkingsByCityId(cityId: number): Promise<Array<ParkingEntity>> {
    const parkingsCollection = mongoClient.db.collection("parkings");
    return parkingsCollection.find({ cityId: cityId }).toArray();
}