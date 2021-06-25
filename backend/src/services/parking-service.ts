import { geoService } from "./geo-service";
import { citiesRepository } from "../repositories/cities-repository";
import { ParkingEntity } from "../repositories/cities-repository";
import { Coordinates } from "./geo-service";
import { countSpotsPermanences, getAveragePayment } from "../repositories/payments-repository";

export class ParkingService {

  constructor() { }

  public async findAvailableParkingByCityId(name: String): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name);
    return city.parkings;
  }

  public async findAvailableParkingByCityIdWithinRadiusFromCityCenter(name: String, radiusKm: number): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name);
    return city.parkings.filter((parking: ParkingEntity) => {
      const center = { longitude: city.longitude, latitude: city.latitude };
      const point = { longitude: parking.longitude, latitude: parking.latitude };
      return geoService.isPointInRadius(center, point, radiusKm)
    });
  }

  public async findAvailableParkingByCityIdWithinRadiusFromPoint(name: String, center: Coordinates, radiusKm: number): Promise<ParkingEntity[]> {
    const city = await citiesRepository.getCityByName(name)
    return city.parkings.filter((parking: ParkingEntity) => {
      const point = { longitude: parking.longitude, latitude: parking.latitude };
      return geoService.isPointInRadius(center, point, radiusKm)
    });
  }

  public async findParkingByCityAndParkingId(cityName: string, parkingId: number): Promise<ParkingEntity> {
    const city = await citiesRepository.getCityByName(cityName);
    const parking = city.parkings.filter((parking: ParkingEntity) => {
      return parking.id == parkingId;
    });
    if (parking) {
      return parking[0]
    } else {
      throw "Parking not found";
    }
  }

  public async getParkingStatistics(cityName: string, parkingId: number): Promise<{name: string, value: string}[]> {
    const parkingSpotIds = await citiesRepository.getSpotsOfParking(cityName, parkingId);
    const permanenceCount = await countSpotsPermanences(parkingSpotIds);
    const avgPayment = await getAveragePayment(parkingSpotIds);
    return [
      {name: "Totale permanenze", value: permanenceCount.length > 0 ? "" + permanenceCount[0].count : "0"}, 
      {name: "Media pagamenti", value: avgPayment.length > 0 ? this.toPriceString(avgPayment[0].avgPayment) : "--" }
    ];
  }

  private toPriceString(price: number): string {
    return "" + Math.floor(price / 100) + "." + price % 100 + "€";
  }
}

export const parkingService: ParkingService = new ParkingService();