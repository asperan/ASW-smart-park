import express from 'express';
import { Coordinates } from '../data/Coordinates';

const parkingController = require('../controllers/parking-controller');
const routes = require('express').Router();

routes.get(
    '/:cityId/all/',
    (req: express.Request, res: express.Response) => {
        const cityId = req.params.cityId;
        const parkings = parkingController.getParkingInCity(cityId);
        res.json(parkings);
    });

routes.get(
    '/:cityId/radius',
    (req: express.Request, res: express.Response) => {
        const cityId = req.params.cityId;
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const radiusKm = req.body.radiusKM;

        const parkings = parkingController.findAvailableParkingByCityIdWithinRadiusFromPoint(cityId, new Coordinates(latitude, longitude), radiusKm);
        res.json(parkings);
    });

    routes.get(
        '/:cityId/radius-center',
        (req: express.Request, res: express.Response) => {
            const cityId = req.params.cityId;
            const radiusKm = req.body.radiusKM;
    
            const parkings = parkingController.getAvailableParkingByCityIdWithinRadiusFromCityCenter(cityId, radiusKm);
            res.json(parkings);
        });

module.exports = routes;