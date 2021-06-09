import express from "express";
import { body } from "express-validator";
import * as messageController from "../controllers/message-controller";
import { validateAccessToken } from "../middleware/token-auth";
import { make400ErrorResponse, make500ErrorResponse } from '../services/response-utils';

const routes = express.Router();

routes.get(
    '/all',
    validateAccessToken,
    async (req: express.Request, res: express.Response) => {
        try {
            const cities = await messageController.getAllMessages();
            res.json(cities);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    }
);

routes.get(
    '/unsent',
    validateAccessToken,
    async (req: express.Request, res: express.Response) => {
        try {
            const cities = await messageController.getAllUnsentMessages();
            res.json(cities);
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    }
);

routes.post(
    '/add',
    validateAccessToken,
    body("type").exists(),
    body("receiver").exists(),
    body("sender").exists(),
    body("subject").exists(),
    body("body").exists(),
    async (req: express.Request, res: express.Response) => {
        const message = req.body;
        message.isSent = false;
        try {
            if(req.userEmail) {
                messageController.insertMessage(message, req.userEmail);
                res.json({status: "OK"});
            } else {
                res.status(500).json({status: "Cannot extract user from token"});
            }
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    }
)

export default routes;