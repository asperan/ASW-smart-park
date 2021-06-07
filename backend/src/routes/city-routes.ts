import express from 'express';
import * as cityController from "../controllers/city-controller";
import { validateAccessToken } from '../middleware/token-auth';
import { make500ErrorResponse } from '../services/response-utils';

const routes = express.Router();

// TODO improve error handling with different codes

routes.get(
  '/suggest/:partialName',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    const partialName = req.params.partialName;
    try {
      const cities = await cityController.suggestCity(partialName);
      res.json(cities);
    } catch (err) {
      make500ErrorResponse(res, err);
    }
  }
);

routes.get(
  '/all',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const cities = await cityController.allCities();
      res.json(cities);
    } catch (err) {
      make500ErrorResponse(res, err);
    }
  }
);


export default routes;