import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TokenManagerService {

  private tokenKeyString = "auth-token";

  constructor(private http: HttpClient) { }

  setToken(newToken: string): void {
    sessionStorage.setItem(this.tokenKeyString, newToken);
  }

  unsetToken(): void {
    sessionStorage.removeItem(this.tokenKeyString);
  }

  getToken(): string {
    const token = sessionStorage.getItem(this.tokenKeyString);
    if (token) {
      return token;
    } else {
      throw "No token found";
    }
  }

  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem(this.tokenKeyString);
    if (token) {
      return this.isTokenValidServerSide(token).pipe(map(res => {
        return res.isValid;
      }));
    } else {
      return new Observable(subscriber => subscriber.next(false));
    }
  }

  isTokenValidServerSide(token: string): Observable<TokenResponse> {
    const url = "http://localhost:3000/api/auth/check";
    const headers = new HttpHeaders({
      "skip-token": "true"
    });
    const options = { headers: headers };
    return this.http.post<TokenResponse>(url, { "token": token }, options);
  }

}

type TokenResponse = {
  "isValid": boolean;
}