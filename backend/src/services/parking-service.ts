import { Parking } from "../models/parking-model";

const parkingModel = require('../models/parking-model');

function findAvailableParkingByCityId(cityId: number): Array<Parking> {
    return parkingModel.findParkingsByCityId(cityId);
}

module.exports = {
    findAvailableParkingByCityId
}