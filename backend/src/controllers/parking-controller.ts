import { ParkingDto } from "../dto/parking-dto";
import { Parking } from "../models/parking-model";

const parkingService = require("../services/parking-service");

function getParkingInCity(cityId: number): Array<ParkingDto> {
    return parkingService.findAvailableParkingByCityId(cityId).map((p: Parking) => ParkingDto.fromModel(p));
}

module.exports = {
    getParkingInCity
}