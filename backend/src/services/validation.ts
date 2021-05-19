import express from "express";
import { validationResult } from "express-validator";

export function validateNotNull(object: any, message: string) {
    if(object == null) {
        throw message;
    }
}

export function validateExpressArgumentsNoErrorsElseReturnBadArguments(req: express.Request, res: express.Response) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json(errors.mapped());
    }
}