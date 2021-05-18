import express from 'express';
import * as cityController from "../controllers/city-controller";

const routes = express.Router();

routes.get(
  '/suggest/:partialName',
  async (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    const cities = await cityController.suggestCity(partialName);
    res.json(cities);
  }
);

routes.get(
  '/all',
  async (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    const cities = await cityController.allCities();
    res.json(cities);
  }
);


export default routes;