import { CityDto } from "../dto/city-dto";
import { City } from "../models/city-model";

const cityService = require("../services/city-service");

function suggestCity(partialName: String): Array<CityDto> {
    return cityService.suggestCityByPartialName(partialName).map((c: City) => CityDto.fromModel(c));
}

module.exports = {
    suggestCity
}