import express from "express";
import { body } from "express-validator";
import { isJwtCorrect } from "../services/user-auth";

const routes = express.Router();

routes.post(
    '/check/',
    body("token").exists(),
    async (req: express.Request, res: express.Response) => {
        const token = req.body.token;
        const isValid = isJwtCorrect(token).ok;
        res.status(200);
        res.json({ isValid: isValid });
    }
);

export default routes;