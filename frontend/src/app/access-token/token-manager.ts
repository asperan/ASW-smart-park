import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenManagerService {
  token: string

  constructor() {
    this.token = "";
  }

  setToken(newToken: string): void {
    this.token = newToken;
  }

  getToken(): string {
    return this.token;
  }
}