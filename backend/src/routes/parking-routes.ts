import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateExpressArgumentsNoErrorsElseReturnBadArguments } from '../common/validation';
import * as parkingController from "../controllers/parking-controller";

const routes = express.Router();

routes.get(
    '/all/:cityName/',
    (req: express.Request, res: express.Response) => {
        const cityName = req.params.cityName;
        parkingController.getParkingInCity(cityName).then(parkings => {
            res.json(parkings);
        });
    });

routes.get(
    '/radius/',
    body("city").exists(),
    body("latitude").exists(),
    body("longitude").exists(),
    body("radiusKM").exists(),
    (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const city = req.body.city;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const radiusKm = req.body.radiusKM;

        const point = {latitude: latitude, longitude: longitude};
        parkingController.getParkingInCityIdWithinRadiusFromPoint(city, point, radiusKm).then(parkings => {
            res.json(parkings);
        });
    });

routes.get(
    '/radius-center/',
    body("city").exists(),
    body("radiusKM").exists(),
    (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const city = req.body.city;
        const radiusKm = req.body.radiusKM;

        parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(city, radiusKm).then(parkings => {
            res.json(parkings);
        });
        
    }
);

export default routes;