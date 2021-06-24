import { citiesRepository, CityEntity } from "../repositories/cities-repository";

export class CitiesService {

    constructor() {
    }

    async getAllCities(): Promise<CityEntity[]> {
        return await citiesRepository.getAllCities();
    }

    async suggestCityByPartialName(name: String): Promise<CityEntity[]> {
        return await citiesRepository.suggestCityByPartialName(name);
    }

    async getCityById(name: String): Promise<CityEntity> {
        return await citiesRepository.getCityByName(name);
    }

    async getCityAndParkingIdFromSpot(spotId: string): Promise<{cityId: string, parkingId: number}> {
        return await citiesRepository.getCityAndParkingIdBySpot(spotId);
    }

    async getParkingDetailFromSpot(spotId: string) {
        return await citiesRepository.getParkingDetailFromSpot(spotId);
    }

    async updateParkingSpotBeaconEntry(spotId: string) {
        await this.setParkingSpotStatus(spotId, true);
    }

    async updateParkingSpotBeaconExit(spotId: string) {
        await this.setParkingSpotStatus(spotId, false);
    }

    private async setParkingSpotStatus(spotId: string, isOccupied: boolean) {
        const city = await this.getCityByParkingSpotId(spotId);
        const parkingIndex = this.findParkingIndex(city, spotId);
        if (parkingIndex >= 0) {
            const spotIndex = city.parkings[parkingIndex].parkingSpots.findIndex(spot => spot.uid == spotId);
            const occupied = city.parkings[parkingIndex].parkingSpots[spotIndex].occupied;
            if (occupied != isOccupied) {
                city.parkings[parkingIndex].parkingSpots[spotIndex].occupied = isOccupied;
                await citiesRepository.updateCityParkings(city.name, city.parkings);
            } else {
                throw new Error("Parking spot already has occupancy status: " + occupied);
            }
        } else {
            throw new Error("City " + city.name + " has no parking with spot " + spotId)
        }
    }

    private findParkingIndex(city: CityEntity, spotId: string) {
        return city.parkings.findIndex(parking => parking.parkingSpots.filter(spot => spot.uid == spotId).length == 1);
    }

    private async getCityByParkingSpotId(spotId: string): Promise<CityEntity> {
        const allCities = await citiesRepository.getAllCities();
        const cities = allCities.filter(city => this.parkingsIncludeSpot(city, spotId));
        if (cities && cities.length == 1) {
            const city = cities[0];
            return city;
        } else {
            throw new Error("Spot id is present in multiple or none cities");
        }
    }

    private parkingsIncludeSpot(city: CityEntity, spotId: string) {
        const spots = city.parkings.flatMap(parking => parking.parkingSpots).filter(spot => spot.uid == spotId);
        if (spots && spots.length == 1) {
            return true;
        } else if (spots && spots.length > 1) {
            throw new Error("Multiple parkings contain spot id");
        } else {
            return false;
        }
    }

}

export const citiesService = new CitiesService();
