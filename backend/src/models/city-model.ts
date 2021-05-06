import { Coordinates } from "../data/Coordinates";

export class City {

    id: number;
    name: string;
    coordinates: Coordinates;

    constructor(id: number, name: string, coordinates: Coordinates) {
        this.id = id;
        this.name = name;
        this.coordinates = coordinates;
    }
}




// Mocking DB interactions with static objects 
// only temporary until mongo is integrated :)

const CITIES = {
    "Cesena": new City(
        1,
        "Cesena",
        new Coordinates(
            44.1390945,
            12.2429281
        )
    ),
    "Rimini": new City(
        2,
        "Rimini",
        new Coordinates(
            44.059444,
            12.568333
        )
    )
}

export function findAllCities(): Array<City> {
    return [
        CITIES.Cesena,
        CITIES.Rimini
    ];
}

export function findCityById(id: number): City {
    return CITIES.Cesena;
}

export function findCitiesByPartialName(name: String): Array<City> {
    if (name.startsWith("C")) {
        return [CITIES.Cesena];
    } else {
        return [CITIES.Rimini];
    }
}
