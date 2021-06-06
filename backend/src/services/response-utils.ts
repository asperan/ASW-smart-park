import express from "express";

export function make500ErrorResponse(res: express.Response, err: any) {
    console.error(JSON.stringify(err));
    res.status(500);
    res.json({
        message: "Internal Server Error",
        err: err
    });
}