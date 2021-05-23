import * as userRepository from "../repositories/users-repository";
import { InsertOneWriteOpResult } from "mongodb";

export async function isUserAlreadyPresent(email: string): Promise<boolean> {
  return userRepository.isUserAlreadyPresent(email);
}

export async function insertNewUser(email: string, salt: string, hashedPassword: string): Promise<InsertOneWriteOpResult<any>> {
  return userRepository.insertNewUser(email, salt, hashedPassword);
}

export async function checkUserPassword(email: string, password: string): Promise<boolean> {
  return userRepository.checkUserPassword(email, password);
}

export async function getVehicleUserInfo(email:string) {
  return userRepository.getUserLinkedVehicles(email);
}

export async function getUserPaymentsInfo(email: string) {
  return userRepository.getUserPayments(email);
}