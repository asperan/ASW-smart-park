import CryptoJs from "crypto-js";
import cryptoRandomString from "crypto-random-string";
import { MongoConnection } from "./mongo-client";

const hashSecretKey = process.env.HASHING_KEY || "";

export function hashPassword(password: string, salt: string): string {
  return CryptoJs.HmacSHA256(salt + password + salt, hashSecretKey).toString();
}

// Checks in the db if the email is present
export async function isUserPresent(email: string): Promise<boolean> {
  const userCollection = MongoConnection.db.collection("users");
  return userCollection.countDocuments({email: email}) > 0;
}

export function generateNewSalt(): string {
  const length = 16;
  return cryptoRandomString({length: length});
}