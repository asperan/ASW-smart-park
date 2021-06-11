import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateExpressArgumentsNoErrorsElseReturnBadArguments } from '../services/validation';
import * as parkingController from "../controllers/parking-controller";
import { make500ErrorResponse } from '../services/response-utils';
import { validateAccessToken } from '../middleware/token-auth';

const routes = express.Router();

// TODO improve error handling with different codes

routes.get(
    '/all/:cityName/',
    validateAccessToken,
    async (req: express.Request, res: express.Response) => {
        const cityName = req.params.cityName;

        try {
            const parkings = await parkingController.getParkingInCity(cityName);
            res.json(parkings);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    });

routes.post(
    '/radius/',
    validateAccessToken,
    body("city").exists(),
    body("latitude").exists(),
    body("longitude").exists(),
    body("radiusKM").exists(),
    async (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const city = req.body.city;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const radiusKm = req.body.radiusKM;

        const point = { latitude: latitude, longitude: longitude };

        try {
            const parkings = await parkingController.getParkingInCityIdWithinRadiusFromPoint(city, point, radiusKm);
            res.json(parkings);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    });

routes.post(
    '/radius-center/',
    validateAccessToken,
    body("city").exists(),
    body("radiusKM").exists(),
    async (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const city = req.body.city;
        const radiusKm = req.body.radiusKM;

        try {
            const parkings = await parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(city, radiusKm);
            res.json(parkings);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    }
);

routes.get(
    '/spots/:cityName/:id',
    validateAccessToken,
    async (req: express.Request, res: express.Response) => {
        const cityName = req.params.cityName;
        const parkingId = req.params.id;
        try {
            const parkingSpots = await parkingController.getParkingSpotsByParkingId(cityName, Number(parkingId));
            res.json(parkingSpots);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    });

export default routes;