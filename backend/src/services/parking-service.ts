import * as geoService from "./geo-service";
import * as citiesRepository from "../repositories/cities-repository";
import { ParkingEntity } from "../repositories/cities-repository";
import { Coordinates } from "./geo-service";

export async function findAvailableParkingByCityId(name: String): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name);
    return city.parkings;
}

export async function findAvailableParkingByCityIdWithinRadiusFromCityCenter(name: String, radiusKm: number): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name);
    return city.parkings.filter((parking: ParkingEntity) => {
        const center = { longitude: city.longitude, latitude: city.latitude };
        const point =  { longitude: parking.longitude, latitude: parking.latitude };
        return geoService.isPointInRadius(center, point, radiusKm)
    });
}

export async function findAvailableParkingByCityIdWithinRadiusFromPoint(name: String, center: Coordinates, radiusKm: number): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name)
    return city.parkings.filter((parking: ParkingEntity) => {
        const point = { longitude: parking.longitude, latitude: parking.latitude };
        return geoService.isPointInRadius(center, point, radiusKm)
    });
}

export async function findParkingByCityAndParkingId(cityName: string, parkingId: number): Promise<ParkingEntity> {
    const city = await citiesRepository.getCityByName(cityName);
    const parking = city.parkings.filter((parking: ParkingEntity) => {
        return parking.id == parkingId;
    });
    if(parking) {
        return parking[0]
    } else {
        throw "Parking not found";
    }
}
