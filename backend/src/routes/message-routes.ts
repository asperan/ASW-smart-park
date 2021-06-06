import express from "express";
import { body } from "express-validator";
import * as messageController from "../controllers/message-controller";
import { make400ErrorResponse, make500ErrorResponse } from '../services/response-utils';

const routes = express.Router();

routes.get(
    '/all',
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
    body("type").exists(),
    body("receiver").exists(),
    body("sender").exists(),
    body("subject").exists(),
    body("body").exists(),
    async (req: express.Request, res: express.Response) => {
        const message = req.body;
        message.isSent = false;
        try {
            messageController.insertMessage(message);
            res.json({status: "OK"});
        } catch (err) {
            make500ErrorResponse(res, err);
        }
    }
)

export default routes;