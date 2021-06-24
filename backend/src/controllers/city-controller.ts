import { CityEntity } from "../repositories/cities-repository";
import { citiesService } from "../services/city-service";

export async function suggestCity(partialName: String): Promise<any[]> {
    const cities = await citiesService.suggestCityByPartialName(partialName);
    return cities.map((city: CityEntity) => makeDtoFromCity(city));
}

export async function allCities() {
    const cities = await citiesService.getAllCities();
    return cities.map((city: CityEntity) => makeDtoFromCity(city));
}

function makeDtoFromCity(city: CityEntity) {
    return {
        name: city.name,
        longitude: city.longitude,
        latitude: city.latitude
    }
}