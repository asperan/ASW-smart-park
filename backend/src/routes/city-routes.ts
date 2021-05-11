import express from 'express';
import * as cityController from "../controllers//city-controller";

const routes = express.Router();

routes.get(
  '/suggest/:partialName',
  (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    const suggestedCities = cityController.suggestCity(partialName);
    res.json(suggestedCities);
  }
);

export default routes;