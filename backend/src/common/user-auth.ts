import CryptoJs from "crypto-js";
import cryptoRandomString from "crypto-random-string";

const hashSecretKey = process.env.HASHING_KEY || "";

export function hashPassword(password: string, salt: string): string {
  return CryptoJs.HmacSHA256(salt + password + salt, hashSecretKey).toString();
}

export function generateNewSalt(): string {
  const length = 16;
  return cryptoRandomString({length: length});
}