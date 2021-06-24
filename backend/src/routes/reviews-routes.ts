import express from 'express';
import { body } from 'express-validator';
import * as reviewsController from "../controllers/reviews-controller";
import { validateAccessToken } from '../middleware/token-auth';
import { make400ErrorResponse, make500ErrorResponse } from '../services/response-utils';

const routes = express.Router();

routes.post(
  '/add/',
  validateAccessToken,
  body('parkingId').exists(),
  body('rating').exists(),
  async (req: express.Request, res: express.Response) => {
    try {
      const userEmail = req.userEmail;
      if (userEmail) {
        const isSuccess = await reviewsController.updateReview(
          req.body.parkingId,
          userEmail,
          req.body.rating
        );
        if (isSuccess) {
          res.json({ status: "OK" });
        } else {
          make400ErrorResponse(res);
        }
      } else {
        make400ErrorResponse(res);
      }
    } catch (err) {
      console.log(err);
      make500ErrorResponse(res, err);
    }
  }
);

routes.get(
  '/get/:parkingId',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const userEmail = req.userEmail;
      const parkingId = Number(req.params.parkingId);
      if (userEmail && parkingId) {
        const review = await reviewsController.getUserReview(
          parkingId,
          userEmail,
        );
        res.json({ isPresent: true, review: review });
      } else {
        make400ErrorResponse(res);
      }
    } catch (err) {
      if (err.message == "No review found") {
        res.json({ isPresent: false });
      } else {
        make500ErrorResponse(res, err);
      }
    }
  }
);

routes.get(
  '/get-all/:parkingId',
  validateAccessToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const userEmail = req.userEmail;
      const parkingId = Number(req.params.parkingId);
      if (userEmail && parkingId) {
        const reviews = await reviewsController.getAllReviews(
          parkingId
        );
        res.json({ isPresent: true, reviews: reviews });
      } else {
        make400ErrorResponse(res);
      }
    } catch (err) {
      if (err.message == "No review found") {
        res.json({ isPresent: false });
      } else {
        make500ErrorResponse(res, err);
      }
    }
  }
);

export default routes;