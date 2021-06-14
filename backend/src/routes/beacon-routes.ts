import express from 'express';
import { body } from 'express-validator';
import * as beaconController from "../controllers/beacon-controller";
import { validateAccessToken } from '../middleware/token-auth';
import { make401ErrorResponse, make500ErrorResponse } from '../services/response-utils';

const routes = express.Router();

routes.post(
    "/entry",
    body("vehicleId").exists(),
    body("spotId").exists(),
    validateAccessToken,
    async (req: express.Request, res: express.Response) => {
        const email = req.userEmail;
        if (!email) {
            res.status(500).json({ status: "Cannot extract user from token" });
        } else {
            const vehicleId = req.body.vehicleId;
            const spotId = req.body.spotId;
            try {
                await beaconController.beaconEntry(vehicleId, spotId, email);
                res.status(200).json({status: "ok"});
            } catch (error) {
                console.log(error);
                if(error.message == "Vehicle is not bound to user") {
                    make401ErrorResponse(res);
                } else {
                    make500ErrorResponse(res, error);
                }
            }
        }
    }
);

routes.post(
    "/exit",
    validateAccessToken,
    body("vehicleId").exists(),
    body("spotId").exists(),
    async (req: express.Request, res: express.Response) => {
        const email = req.userEmail;
        if (!email) {
            res.status(500).json({ status: "Cannot extract user from token" });
        } else {
            const vehicleId = req.body.vehicleId;
            const spotId = req.body.spotId;
            try {
                await beaconController.beaconExit(vehicleId, spotId, email);
                res.status(200).json({status: "ok"});
            } catch (error) {
                console.log(error);
                console.log(JSON.stringify(error));
                if(error.message == "Vehicle is not bound to user") {
                    make401ErrorResponse(res);
                } else {
                    make500ErrorResponse(res, error);
                }
            }
        }
    }
);

export default routes;