import { CityDto, DtoFromModel } from "../dto/city-dto";
import { CityModel } from "../models/city-model";
import * as cityService from "../services/city-service";

export function suggestCity(partialName: String): Array<CityDto> {
    return cityService.suggestCityByPartialName(partialName).map((c: CityModel) => DtoFromModel(c));
}
