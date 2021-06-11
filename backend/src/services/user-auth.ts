import CryptoJs from "crypto-js";
import cryptoRandomString from "crypto-random-string";
import express from "express";
import jwt from "jsonwebtoken";

const hashSecretKey = process.env.HASHING_KEY || "";
const jwtSecret = process.env.JWT_SIGN_SECRET || "";

export function hashPassword(password: string, salt: string): string {
  return CryptoJs.HmacSHA256(salt + password + salt, hashSecretKey).toString();
}

export function generateNewSalt(): string {
  const length = 16;
  return cryptoRandomString({ length: length });
}

export function generateNewJwt(email: string): string {
  return jwt.sign({ userEmail: email }, jwtSecret);
}

export function isJwtCorrect(token: string): { ok: boolean, email?: string } {
  try {
    const decoded: any = jwt.verify(token, jwtSecret);
    return { ok: true, email: decoded.userEmail };
  } catch (error: any) {
    return { ok: false };
  }
}

export function checkAccessToken(request: express.Request, response: express.Response, callback: (email: string) => any) {
  const accessToken = request.header("x-access-token");
  if (accessToken) {
    const result = isJwtCorrect(accessToken);
    if (result.ok && result.email) {
      callback(result.email);
    } else {
      response.status(400).json({ code: 1, message: "Bad JWT." });
    }
  } else {
    response.status(400).json({ code: 2, message: "JWT not sent." });
  }
}