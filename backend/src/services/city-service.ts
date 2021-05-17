import * as citiesRepository  from "../repositories/cities-repository";

export async function getAllCities(): Promise<citiesRepository.CityEntity[]>  {
    return await citiesRepository.getAllCities();
}

export async function suggestCityByPartialName(name: String): Promise<citiesRepository.CityEntity[]> {
    return await citiesRepository.suggestCityByPartialName(name);
}

export async function getCityById(name: String): Promise<citiesRepository.CityEntity> {
    return await citiesRepository.getCityByName(name);
}