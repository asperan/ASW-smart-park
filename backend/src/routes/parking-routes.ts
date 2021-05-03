import express from 'express';

const parkingController = require('../controllers/parking-controller');
const routes = require('express').Router();

routes.get(
    '/:cityId/all/',
    (req: express.Request, res: express.Response) => {
        const cityId = req.params.cityId;
        const parkings = parkingController.getParkingInCity(cityId);
        res.json(parkings);
    });

module.exports = routes;