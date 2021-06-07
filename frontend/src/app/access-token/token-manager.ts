import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenManagerService {

  constructor() { }

  setToken(newToken: string): void {
    sessionStorage.setItem("auth-token", newToken);
  }

  getToken(): string {
    const token = sessionStorage.getItem("auth-token");
    if(token) {
      return token;
    } else {
      throw "No token found";
    }
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem("auth-token");
    if(token && this.isTokenValidServerSide()) {
      return true;
    } else {
      return false;
    }
  }

  isTokenValidServerSide(): boolean {
    return true; // TODO call backend
  }
  
}