import { CityDto } from "../dto/city-dto";
import { City } from "../models/city-model";
import * as cityService from "../services/city-service";

export function suggestCity(partialName: String): Array<CityDto> {
    return cityService.suggestCityByPartialName(partialName).map((c: City) => CityDto.fromModel(c));
}
