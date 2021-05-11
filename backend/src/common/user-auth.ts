import CryptoJs from "crypto-js";
import cryptoRandomString from "crypto-random-string";
import jwt from "jsonwebtoken";

const hashSecretKey = process.env.HASHING_KEY || "";

export function hashPassword(password: string, salt: string): string {
  return CryptoJs.HmacSHA256(salt + password + salt, hashSecretKey).toString();
}

export function generateNewSalt(): string {
  const length = 16;
  return cryptoRandomString({length: length});
}

export function generateNewJwt(email: string): string {
  const jwtSecret = "ProgettoASW2021";
  const sessionIdLength = 20;
  return jwt.sign({sessionId: cryptoRandomString({length: sessionIdLength}), userEmail: email}, jwtSecret);
}