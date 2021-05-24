import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateExpressArgumentsNoErrorsElseReturnBadArguments } from '../services/validation';
import * as parkingController from "../controllers/parking-controller";

const routes = express.Router();

routes.get(
    '/all/:cityName/',
    async (req: express.Request, res: express.Response) => {
        const cityName = req.params.city;
        const parkings = await parkingController.getParkingInCity(cityName);
        res.json(parkings);
    });

routes.post(
    '/radius/',
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

        const point = {latitude: latitude, longitude: longitude};
        const parkings = await parkingController.getParkingInCityIdWithinRadiusFromPoint(city, point, radiusKm);
        res.json(parkings);
    });

routes.post(
    '/radius-center/',
    body("city").exists(),
    body("radiusKM").exists(),
    async (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const city = req.body.city;
        const radiusKm = req.body.radiusKM;

        const parkings = await parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(city, radiusKm);
        res.json(parkings);
        
    }
);

export default routes;