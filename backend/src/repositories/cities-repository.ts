import { Collection } from "mongodb";
import { mongoClient } from "../services/mongo-client";

export type CityEntity = {
    name: string,
    longitude: number,
    latitude: number,
    parkings: ParkingEntity[]
}

export type ParkingEntity = {
    id: number,
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
    type: string,
    imageUrl?: string
}

export type ParkingPricingEntity = {
    days: string,
    hours: string,
    price: number
}

export class CitiesRepository {

    constructor() {

    }

    async getAllCities(): Promise<CityEntity[]> {
        const citiesCollection = mongoClient.db.collection("cities");
        return citiesCollection.find().toArray().then(res => res.map(r => this.formCityEntity(r)));
    }
    
    async suggestCityByPartialName(name: String): Promise<CityEntity[]> {
        const citiesCollection = mongoClient.db.collection("cities");
        const regExp = new RegExp("^" + name, "gi");
        return citiesCollection.find({ name: regExp }).toArray().then(res => res.map(r => this.formCityEntity(r)));
    }
    
    async getCityByName(name: String): Promise<CityEntity> {
        const citiesCollection = mongoClient.db.collection("cities");
        return citiesCollection.findOne({ name: name.toLowerCase() }).then(res => this.formCityEntity(res));
    }
    
    async updateCityParkings(cityName: string, parkings: ParkingEntity[]) {
        const citiesCollection = mongoClient.db.collection("cities");
        return citiesCollection.updateOne({ "city": cityName }, {
            $set: {
                parkings: parkings
            }
        });
    }
    
    private formCityEntity(res: any): CityEntity {
        return {
            name: res.name,
            longitude: Number(res.longitude),
            latitude: Number(res.latitude),
            parkings: res.parkings.map((parking: any) => this.formParkingEntity(parking))
        };
    }
    
    private formParkingEntity(res: any): ParkingEntity {
        return {
            id: res.id,
            longitude: Number(res.longitude),
            latitude: Number(res.latitude),
            parkingSpots: res.parkingSpots.map((parkingSpot: any) => this.formParkingSpotEntity(parkingSpot)),
            detail: res.detail,
            pricing: this.formPricingEntity(res.pricing)
        }
    }
    
    private formParkingSpotEntity(res: any): ParkingSpotEntity {
        return {
            uid: res.uid,
            occupied: res.occupied,
            paidFor: res.paidFor,
            longitude: Number(res.longitude),
            latitude: Number(res.latitude),
        }
    }
    
    private formPricingEntity(res: any): ParkingPricingEntity {
        return {
            days: res.days,
            hours: res.hours,
            price: Number(res.price)
        }
    }

}

export const citiesRepository = new CitiesRepository();
