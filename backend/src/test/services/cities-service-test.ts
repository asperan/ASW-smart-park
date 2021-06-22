import { CitiesRepository, CityEntity } from "../../repositories/cities-repository";
import { CitiesService } from "../../services/city-service";
import { citiesStub } from "./stubs";

const sinon = require("sinon");
const expect = require("chai").expect;

describe("Cities Service test", function() {

    afterEach(function () {
        sinon.restore();
    });

    it("getAllCities", async function() {
        sinon.stub(CitiesRepository.prototype, "getAllCities").returns(getAllCitiesStub());
        const citiesService = new CitiesService();

        const result = await citiesService.getAllCities();

        expect(result).to.equal(citiesStub);
    });

    it("suggestCityByPartialName", async function() {
        sinon.stub(CitiesRepository.prototype, "suggestCityByPartialName").returns(suggestCityByPartialNameStub("c"));
        const citiesService = new CitiesService();

        const result = await citiesService.suggestCityByPartialName("s");

        expect(result[0]).to.equal(citiesStub[0]);
    });

    it("getCityById", async function() {
        sinon.stub(CitiesRepository.prototype, "getCityByName").returns(getCityByNameStub("cesena"));
        const citiesService = new CitiesService();

        const result = await citiesService.getCityById("cesena");

        expect(result).to.equal(citiesStub[0]);
    });

    it("updateParkingSpotBeaconEntry", async function() {
        sinon.stub(CitiesRepository.prototype, "getAllCities").returns(getAllCitiesStub());
        sinon.stub(CitiesRepository.prototype, "updateCityParkings").returns(new Promise((resolve, reject) => resolve(null)));
        const citiesService = new CitiesService();

        expect(async () => await citiesService.updateParkingSpotBeaconEntry("ces-bac-2")).to.not.throw();
    });

    it("updateParkingSpotBeaconExit", async function() {
        sinon.stub(CitiesRepository.prototype, "getAllCities").returns(getAllCitiesStub());
        sinon.stub(CitiesRepository.prototype, "updateCityParkings").returns(new Promise((resolve, reject) => resolve(null)));
        const citiesService = new CitiesService();

        expect(async () => await citiesService.updateParkingSpotBeaconExit("ces-bac-2")).to.not.throw();
    });

})

function getAllCitiesStub(): Promise<CityEntity[]> {
    return new Promise((resolve, reject) => {
        resolve(citiesStub);
    });
}

function suggestCityByPartialNameStub(partial: string): Promise<CityEntity[]> {
    return new Promise((resolve, reject) => {
        resolve(citiesStub.filter(city => city.name.startsWith(partial)));
    });
}

function getCityByNameStub(cityName: string): Promise<CityEntity> {
    return new Promise((resolve, reject) => {
        resolve(citiesStub.filter(city => city.name == cityName)[0]);
    });
}