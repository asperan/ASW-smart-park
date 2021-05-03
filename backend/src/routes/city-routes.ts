import express from 'express';

const cityController = require('../controllers/city-controller');
const routes = require('express').Router();

routes.get(
  '/suggest/:partialName',
  (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    const suggestedCities = cityController.suggestCity(partialName);
    res.json(suggestedCities);
  });

module.exports = routes;