import * as cityModel from "../models/city-model";

export function suggestCityByPartialName(name: String): Array<cityModel.CityModel> {
    return cityModel.findCitiesByPartialName(name);
}

export function getCityById(cityId: number): cityModel.CityModel {
    return cityModel.findCityById(cityId);
}

export function getAllCities(): Array<cityModel.CityModel> {
    return cityModel.findAllCities();
}
