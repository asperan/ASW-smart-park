import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import UserCredentials from "./user-credentials";

@Injectable({
  providedIn: "root",
})
export class SigninService {

  constructor(private http: HttpClient) { }

  requestSignin(credentials: UserCredentials): Observable<Object> {
    return this.http.post("http://localhost:3000/api/auth/signin", JSON.stringify(credentials));
  }

}