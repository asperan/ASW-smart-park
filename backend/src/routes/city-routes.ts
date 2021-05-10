import express from 'express';
import * as cityController from "../controllers/city-controller";

const routes = express.Router();

routes.get(
  '/suggest/:partialName',
  (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    cityController.suggestCity(partialName).then(cities => {
      res.json(cities);
    });
  }
);

routes.get(
  '/all',
  (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    cityController.allCities().then(cities => {
      res.json(cities);
    });
  }
);


export default routes;