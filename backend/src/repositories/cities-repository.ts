import { mongoClient } from "../services/mongo-client";

export type CityEntity = {
    name: string,
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
    parkingSpots: ParkingSpotEntity[],
    detail: ParkingDetailEntity,
    pricing: ParkingPricingEntity
}

export type ParkingSpotEntity = {
    uid: string,
    occupied: boolean,
    paidFor: boolean,
    longitude: number,
    latitude: number
}

export type ParkingDetailEntity = {
    name: string,
    address: string,
    type: string
}

export type ParkingPricingEntity = {
    days: string,
    hours: string,
    price: number
}

const citiesCollection = mongoClient.db.collection("cities");

export async function getAllCities(): Promise<CityEntity[]> {
    return citiesCollection.find().toArray().then(res => res.map(r => formCityEntity(r)));
}

export async function suggestCityByPartialName(name: String): Promise<CityEntity[]> {
    const regExp = new RegExp("^" + name, "gi");
    return citiesCollection.find({ name: regExp }).toArray().then(res => res.map(r => formCityEntity(r)));
}

export async function getCityByName(name: String): Promise<CityEntity> {
    return citiesCollection.findOne({ name: name.toLowerCase() }).then(res => formCityEntity(res));
}

export async function updateCityParkings(cityName: string, parkings: ParkingEntity[]) {
    return citiesCollection.updateOne({ "city": cityName }, {
        $set: {
            parkings: parkings
        }
    });
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
        parkingSpots: res.parkingSpots.map((parkingSpot: any) => formParkingSpotEntity(parkingSpot)),
        detail: res.detail,
        pricing: formPricingEntity(res.pricing)
    }
}

function formParkingSpotEntity(res: any): ParkingSpotEntity {
    return {
        uid: res.id,
        occupied: res.occupied,
        paidFor: res.paidFor,
        longitude: Number(res.longitude),
        latitude: Number(res.latitude),
    }
}

function formPricingEntity(res: any): ParkingPricingEntity {
    return {
        days: res.days,
        hours: res.hours,
        price: Number(res.price)
    }
}
