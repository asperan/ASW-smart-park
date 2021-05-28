import { type } from "node:os";
import { mongoClient } from "../services/mongo-client";

export type CityEntity = {
    name: String,
    longitude: number,
    latitude: number,
    parkings: ParkingEntity[]
}

export type ParkingEntity = {
    id: number,
    capacity: number,
    occupancy: number,
    longitude: number,
    latitude: number,
    parkingSpots: ParkingSpotEntity[]
}

export type ParkingSpotEntity = {
    id: number,
    occupied: boolean,
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
        id: res.id,
        capacity: res.capacity,
        occupancy: res.occupancy,
        longitude: Number(res.longitude),
        latitude: Number(res.latitude),
        parkingSpots: res.parkingSpots.map((parkingSpot:any) => formParkingSpotEntity(parkingSpot))
    }
}

function formParkingSpotEntity(res: any): ParkingSpotEntity {
    return {
        id: res.id,
        occupied: res.occupied,
        longitude: Number(res.longitude),
        latitude: Number(res.latitude),
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
