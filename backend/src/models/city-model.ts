export class City {

    id: number;
    name: string;
    longitude: number;
    latitude: number;

    constructor(id: number, name: string, longitude: number, latitude: number) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}




// Mocking DB interactions with static objects 
// only temporary until mongo is integrated :)

const CITIES = {
    "Cesena": new City(
        1,
        "Cesena",
        44.1390945,
        12.2429281
    ), 
    "Rimini": new City(
        2,
        "Rimini",
        44.059444,
        12.568333
    )
}

function findAllCities(): Array<City> {
    return [
        CITIES.Cesena,
        CITIES.Rimini
    ];
}

function findCitiesByPartialName(name: String): Array<City> {
    if (name.startsWith("C")) {
        return [CITIES.Cesena];
    } else {
        return [CITIES.Rimini];
    }
}

module.exports = {
    findAllCities,
    findCitiesByPartialName
}