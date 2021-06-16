import { GeoService } from "../../services/geo-service";

const sinon = require("sinon");
const expect = require("chai").expect;

describe("Geo Service test", function(){
    const geoService = new GeoService();
    
    afterEach(function () {
        sinon.restore();
    });
    
    it("isPointInRadius Positive", function() {
        const center = {
            longitude: 12.2429281,
            latitude: 44.1390945,
        };
        const point = {
            longitude: 12.236731,
            latitude: 44.147660
        }
        const result = geoService.isPointInRadius(center, point, 10);

        expect(result).to.equal(true);
    });

    it("isPointInRadius negative", function() {
        const center = {
            longitude: 12.2429281,
            latitude: 44.1390945,
        };
        const point = {
            longitude: 12.236731,
            latitude: 44.147660
        }
        const result = geoService.isPointInRadius(center, point, 1);

        expect(result).to.equal(false);
    });

    it("getDistanceFromLatLonInKm", function() {
        const center = {
            longitude: 12.2429281,
            latitude: 44.1390945,
        };
        const point = {
            longitude: 12.236731,
            latitude: 44.147660
        }
        const distance = geoService.getDistanceFromLatLonInKm(center, point);

        expect(distance).to.equal(1.0731543481941483);
    });
});