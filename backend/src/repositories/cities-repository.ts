import { mongoClient } from "../services/mongo-client";

export type CityEntity = {
    name: String,
    longitude: number,
    latitude: number,
    parkings: ParkingEntity[]
}

export type ParkingEntity = {
    capacity: number,
    occupancy: number,
    longitude: number,
    latitude: number
}

function formCityEntity(res: any): CityEntity {
    return {
        name: res.name,
        longitude: Number(res.longitude),
        latitude: Number(res.latitude),
        parkings: res.parkings.map((parking: any) => formParkingEntity(parking))
    };
}

function formParkingEntity(res: any): ParkingEntity {
    return {
        capacity: res.capacity,
        occupancy: res.occupancy,
        longitude: Number(res.longitude),
        latitude: Number(res.latitude)
    }
}

export async function getAllCities(): Promise<CityEntity[]> {
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.find().toArray().then(res => res.map(r => formCityEntity(r)));
}

export async function suggestCityByPartialName(name: String): Promise<CityEntity[]> {
    const regExp = new RegExp("^" + name, "gi");
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.find({name: regExp}).toArray().then(res => res.map(r => formCityEntity(r)));
}

export async function getCityByName(name: String): Promise<CityEntity> {
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.findOne({name: name.toLowerCase()}).then(res => formCityEntity(res));
}