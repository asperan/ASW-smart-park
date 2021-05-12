import * as citiesRepository  from "../repositories/cities-repository";

export async function getAllCities(): Promise<citiesRepository.CityEntity[]>  {
    return citiesRepository.getAllCities();
}

export async function suggestCityByPartialName(name: String): Promise<citiesRepository.CityEntity[]> {
    return citiesRepository.suggestCityByPartialName(name);
}

export async function getCityById(name: String): Promise<citiesRepository.CityEntity> {
    return citiesRepository.getCityByName(name);
}