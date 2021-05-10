import express from 'express';
import { body, validationResult } from 'express-validator';
import { validateExpressArgumentsNoErrorsElseReturnBadArguments } from '../common/validation';
import * as parkingController from "../controllers/parking-controller";

const routes = express.Router();

routes.get(
    '/all/:cityId/',
    (req: express.Request, res: express.Response) => {
        const cityId = Number.parseInt(req.params.cityId);
        parkingController.getParkingInCity(cityId).then(parkings => {
            res.json(parkings);
        });
    });

routes.get(
    '/radius/',
    body("cityId").exists(),
    body("latitude").exists(),
    body("longitude").exists(),
    body("radiusKM").exists(),
    (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const cityId = req.body.cityId;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const radiusKm = req.body.radiusKM;

        parkingController.getParkingInCityIdWithinRadiusFromPoint(cityId, {latitude: latitude, longitude: longitude}, radiusKm).then(parkings => {
            res.json(parkings);
        });
    });

routes.get(
    '/radius-center/',
    body("cityId").exists(),
    body("radiusKM").exists(),
    (req: express.Request, res: express.Response) => {
        validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

        const cityId = req.body.cityId;
        const radiusKm = req.body.radiusKM;

        parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm).then(parkings => {
            res.json(parkings);
        });
        
    }
);

export default routes;