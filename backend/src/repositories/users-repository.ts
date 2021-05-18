import { mongoClient } from "../services/mongo-client";
import { InsertOneWriteOpResult } from "mongodb";
import { hashPassword } from "../services/user-auth";

const userCollection = mongoClient.db.collection("users");

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return await userCollection.countDocuments({email: email}) > 0;
}

export async function insertUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return await userCollection.insertOne({email: email, password: hashedPassword, salt: salt});
}

export async function checkUserPassword(email: string, password: string): Promise<boolean> {
  const user = await userCollection.findOne({email: email});
  if (user) {
      const correctHashedPassword = user.password;
      const userSalt = user.salt;
      const insertedPasswordHash = hashPassword(password, userSalt);
      return correctHashedPassword === insertedPasswordHash;
  } else {
      return false;
  }
}