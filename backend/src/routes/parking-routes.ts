import express from 'express';
import { body, validationResult} from 'express-validator';
import { validateExpressArgumentsNoErrorsElseReturnBadArguments } from '../common/validation';
import { Coordinates } from '../data/Coordinates';

const parkingController = require('../controllers/parking-controller');
const routes = require('express').Router();

routes.get(
    '/all/:cityId/',
    (req: express.Request, res: express.Response) => {
        const cityId = req.params.cityId;
        const parkings = parkingController.getParkingInCity(cityId);
        res.json(parkings);
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

        const parkings = parkingController.getParkingInCityIdWithinRadiusFromPoint(cityId, new Coordinates(latitude, longitude), radiusKm);
        res.json(parkings);
    });

    routes.get(
        '/radius-center/',
        body("cityId").exists(),
        body("radiusKM").exists(),
        (req: express.Request, res: express.Response) => {
            validateExpressArgumentsNoErrorsElseReturnBadArguments(req, res);

            const cityId = req.body.cityId;
            const radiusKm = req.body.radiusKM;
    
            const parkings = parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm);
            res.json(parkings);
        });

module.exports = routes;