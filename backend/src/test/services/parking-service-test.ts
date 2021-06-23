import { CitiesRepository, CityEntity } from "../../repositories/cities-repository";
import { GeoService } from "../../services/geo-service";
import { ParkingService } from "../../services/parking-service";
import { citiesStub } from "./stubs";

const sinon = require("sinon");
const expect = require("chai").expect;

describe("Parking Service test", function() {
    
    afterEach(function () {
        sinon.restore();
    });

    it("findAvailableParkingByCityId", async function() {
        sinon.stub(CitiesRepository.prototype, "getCityByName").returns(getCityByNameStub("cesena"));
        sinon.stub(GeoService.prototype);
        const parkingService = new ParkingService()

        const result = await parkingService.findAvailableParkingByCityId("cesena");

        expect(result).to.equal(citiesStub[0].parkings);
    });

    it("findAvailableParkingByCityIdWithinRadiusFromCityCenter", async function() {
        sinon.stub(CitiesRepository.prototype, "getCityByName").returns(getCityByNameStub("cesena"));
        sinon.stub(GeoService.prototype, "isPointInRadius").returns(true);
        const parkingService = new ParkingService()

        const result = await parkingService.findAvailableParkingByCityId("cesena");

        expect(result).to.equal(citiesStub[0].parkings);
    });

    it("findAvailableParkingByCityIdWithinRadiusFromPoint", async function() {
        sinon.stub(CitiesRepository.prototype, "getCityByName").returns(getCityByNameStub("cesena"));
        sinon.stub(GeoService.prototype, "isPointInRadius").returns(true);
        const parkingService = new ParkingService()

        const result = await parkingService.findAvailableParkingByCityId("cesena");

        expect(result).to.equal(citiesStub[0].parkings);
    });

    it("findParkingByCityAndParkingId", async function() {
        sinon.stub(CitiesRepository.prototype, "getCityByName").returns(getCityByNameStub("cesena"));
        sinon.stub(GeoService);
        const parkingService = new ParkingService()

        const result = await parkingService.findParkingByCityAndParkingId("cesena", 1);

        expect(result).to.equal(citiesStub[0].parkings[0]);
    });
});

function getCityByNameStub(cityName: string): Promise<CityEntity> {
    return new Promise((resolve, reject) => {
        resolve(citiesStub.filter(city => city.name == cityName)[0]);
    });
}