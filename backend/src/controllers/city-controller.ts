import { CityEntity } from "../repositories/cities-repository";
import * as cityService from "../services/city-service";

export async function suggestCity(partialName: String): Promise<any[]> {
   const cities = await cityService.suggestCityByPartialName(partialName);
   return cities.map((city: CityEntity) => makeDtoFromCity(city));
}

export async function allCities() {
    const cities = await  cityService.getAllCities();
    return cities.map((city: CityEntity) => makeDtoFromCity(city));
}

function makeDtoFromCity(city: CityEntity) {
    return {
        name: city.name,
        longitude: city.longitude,
        latitude: city.latitude
    }
}