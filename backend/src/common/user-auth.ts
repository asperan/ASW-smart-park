import CryptoJs from "crypto-js";
import cryptoRandomString from "crypto-random-string";
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