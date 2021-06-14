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

export async function updateParkingSpotBeaconEntry(spotId: string) {
    await setParkingSpotStatus(spotId, true);
}

export async function updateParkingSpotBeaconExit(spotId: string) {
    await setParkingSpotStatus(spotId, false);
}

async function setParkingSpotStatus(spotId:string, isOccupied: boolean) {
    const city = await getCityByParkingSpotId(spotId);

    const parkingIndex = city.parkings.findIndex(parking => parking.parkingSpots.filter(spot => spot.uid == spotId).length == 1);
    if(parkingIndex) {
        const spotIndex = city.parkings[parkingIndex].parkingSpots.findIndex(spot => spot.uid == spotId);
        const occupied = city.parkings[parkingIndex].parkingSpots[spotIndex].occupied;
        if(occupied != isOccupied) {
            city.parkings[parkingIndex].parkingSpots[spotIndex].occupied = isOccupied;
        } else {
            throw "Parking spot already has occupancy status: " + occupied;
        }
    } else {
        throw "City " + city.name + "has not parking with spot " + spotId;
    }
}

async function getCityByParkingSpotId(spotId: string): Promise<citiesRepository.CityEntity> {
    const allCities = await citiesRepository.getAllCities();
    const cities = allCities.filter(city => parkingsIncludeSpot(city, spotId));
    if(cities && cities.length == 1) {
        const city = cities[0];
        return city;
    } else {
        throw "Spot id is present in multiple or none cities";
    }
}

function parkingsIncludeSpot(city: citiesRepository.CityEntity, spotId: string) {
    const spots = city.parkings.flatMap(parking => parking.parkingSpots).filter(spot => spot.uid == spotId);
    if (spots && spots.length == 1) {
        return true;
    } else if(spots && spots.length > 1){
        throw "Multiple parkings contain spot id";
    } else {
        return false;
    }
}