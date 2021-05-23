import { Injectable } from "@angular/core";
import { GetStorageConflig, NgStorage, StorageConfig, StorageTypeUnit } from "ng-storage-local";

const tokenStoragePrototype = {
  storageType: StorageTypeUnit.STRING,
  storageKey: "SMART_PARK_ACCESS_TOKEN",
}

@Injectable({
  providedIn: "root",
})
export class TokenManagerService {

  constructor(private ngStorage: NgStorage) { }

  setToken(newToken: string): void {
    const tokenStorage: StorageConfig = Object.create(tokenStoragePrototype, {storageData: {value: newToken}} );
    this.ngStorage.setSessionStorage(tokenStorage);
  }

  async getToken(): Promise<string> {
    const tokenGetter: GetStorageConflig = Object.create(tokenStoragePrototype);
    const token = await this.ngStorage.getSessionStorage(tokenGetter);
    return token.error ? "" : token;
  }
}