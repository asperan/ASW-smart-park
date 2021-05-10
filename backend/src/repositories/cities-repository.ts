import { mongoClient } from "../common/mongo-client";

export type CityEntity = {
    id: number,
    name: String,
    longitude: number,
    latitude: number
}

export async function getAllCities(): Promise<Array<CityEntity>> {
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.find().toArray();
}

export async function suggestCityByPartialName(name: String): Promise<Array<CityEntity>> {
    const regExp = new RegExp("^" + name, "g");
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.find({name: regExp}).toArray();
}

export async function getCityById(cityId: number): Promise<CityEntity> {
    const citiesCollection = mongoClient.db.collection("cities");
    return citiesCollection.findOne({cityId: cityId})
}