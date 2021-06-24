import express from "express";

export function make500ErrorResponse(res: express.Response, err: any) {
  console.error(JSON.stringify(err));
  res.status(500);
  res.json({
    message: "Internal Server Error",
    err: err
  });
}

export function make400ErrorResponse(res: express.Response) {
  res.status(400);
  res.json({
    message: "Bad Request",
  });
}

export function make401ErrorResponse(res: express.Response) {
  res.status(401);
  res.json({
    message: "Unathrorized",
  });
}