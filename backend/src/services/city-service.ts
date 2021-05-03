import { City } from "../models/city-model";

const cityModel = require("../models/city-model");

function suggestCityByPartialName(name: String): Array<City> {
    return cityModel.findCitiesByPartialName(name);
}

function getAllCities(): Array<City> {
    return cityModel.findAllCities();
}

module.exports = {
    suggestCityByPartialName,
    getAllCities
}