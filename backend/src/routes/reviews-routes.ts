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
        if(userEmail) {
            const isSuccess = await reviewsController.addReview(
                req.body.parkingId,
                userEmail,
                req.body.rating
            );
            if(isSuccess) {
                res.json({status: "OK"});
            } else {
                make400ErrorResponse(res);
            }
        } else {
            make400ErrorResponse(res);
        }
      } catch (err) {
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
        if(userEmail && parkingId) {
            const review = await reviewsController.getUserReview(
                parkingId,
                userEmail,
            );
            if(review) {
                res.json({isPresent: true, review: review});
            } else {
                res.json({isPresent: false});
            }
        } else {
            make400ErrorResponse(res);
        }
      } catch (err) {
        make500ErrorResponse(res, err);
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
        if(userEmail && parkingId) {
            const reviews = await reviewsController.getAllReviews(
                parkingId
            );
            if(reviews) {
                res.json({isPresent: true, reviews: reviews});
            } else {
                res.json({isPresent: false});
            }
        } else {
            make400ErrorResponse(res);
        }
      } catch (err) {
        make500ErrorResponse(res, err);
      }
    }
);

export default routes;