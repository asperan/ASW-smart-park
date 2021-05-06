import * as cityModel from "../models/city-model";

export function suggestCityByPartialName(name: String): Array<cityModel.City> {
    return cityModel.findCitiesByPartialName(name);
}

export function getCityById(cityId: number): cityModel.City {
    return cityModel.findCityById(cityId);
}

export function getAllCities(): Array<cityModel.City> {
    return cityModel.findAllCities();
}
