
import { ParkingEntity, ParkingPricingEntity, ParkingSpotEntity } from "../repositories/cities-repository";
import { Coordinates } from "../services/geo-service";
import { parkingService } from "../services/parking-service";

export async function getParkingInCity(name: string): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityId(name)
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

export async function getParkingInCityIdWithinRadiusFromPoint(name: string, center: Coordinates, radiusKm: number): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityIdWithinRadiusFromPoint(name, center, radiusKm);
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

export async function getAvailableParkingByCityIdWithinRadiusFromCityCenter(name: string, radiusKm: number): Promise<any[]> {
    const parkings = await parkingService.findAvailableParkingByCityIdWithinRadiusFromCityCenter(name, radiusKm);
    return parkings.map((parking: ParkingEntity) => makeDtoFromParking(parking));
}

export async function getParkingSpotsByParkingId(cityName: string, parkingId: number) {
    const parking = await parkingService.findParkingByCityAndParkingId(cityName, parkingId);
    return makeDtoFromParking(parking);
}

function makeDtoFromParking(parking: ParkingEntity) {
    return {
        id: parking.id,
        longitude: parking.longitude,
        latitude: parking.latitude,
        parkingSpots: parking.parkingSpots.map(s => makeDtoFromParkingSpot(s)),
        detail: parking.detail,
        pricing: makeDtoFromPricing(parking.pricing)
    };
}

function makeDtoFromParkingSpot(s: ParkingSpotEntity): any {
    return {
        occupied: s.occupied,
        paidFor: s.paidFor,
        longitude: s.longitude,
        latitude: s.latitude
    }
}

function makeDtoFromPricing(p: ParkingPricingEntity): any {
    return {
        days: p.days,
        hours: p.hours,
        price: p.price
    }
}

