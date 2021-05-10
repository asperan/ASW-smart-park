import { CityEntity } from "../repositories/cities-repository";
import * as cityService from "../services/city-service";

export async function suggestCity(partialName: String): Promise<any[]> {
    return cityService.suggestCityByPartialName(partialName).then(cities => {
        return cities.map((city: CityEntity) => makeDtoFromCity(city))
    });
}

export async function allCities() {
    return cityService.getAllCities().then(cities => {
        return cities.map((city: CityEntity) => makeDtoFromCity(city))
    });
}

function makeDtoFromCity(city: CityEntity) {
    return {
        id: city.id,
        longitude: city.longitude,
        latitude: city.latitude
    }
}