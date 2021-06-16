import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})
export class TokenManagerService {

  constructor(private http: HttpClient) { }

  setToken(newToken: string): void {
    sessionStorage.setItem("auth-token", newToken);
  }

  getToken(): string {
    const token = sessionStorage.getItem("auth-token");
    if (token) {
      return token;
    } else {
      throw "No token found";
    }
  }

  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem("auth-token");
    return this.isTokenValidServerSide(token).pipe(map(res => {
      return res.isValid;
    }));
  }

  isTokenValidServerSide(token: string | null): Observable<TokenResponse> {
    const url = environment.baseUrl + "/auth/check";
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
