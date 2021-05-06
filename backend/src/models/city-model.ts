import { Coordinates } from "../data/Coordinates";

export type CityModel = {
    id: number,
    name: string,
    coordinates: Coordinates,
}

export function findAllCities(): Array<CityModel> {
    return [
        CITIES.Cesena,
        CITIES.Rimini
    ];
}

export function findCityById(id: number): CityModel {
    return CITIES.Cesena;
}

export function findCitiesByPartialName(name: String): Array<CityModel> {
    if (name.startsWith("C")) {
        return [CITIES.Cesena];
    } else {
        return [CITIES.Rimini];
    }
}

const CITIES = {
    "Cesena": {
        id: 1,
        name: "Cesena",
        coordinates: {
            longitude: 44.1390945,
            latitude: 12.2429281
        }
    },
    "Rimini": {
        id: 2,
        name: "Rimini",
        coordinates: {
            longitude: 44.059444,
            latitude: 12.568333
        }
    }
}
