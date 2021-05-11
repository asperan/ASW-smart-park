import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import UserCredentials from "./user-credentials";

@Injectable({
  providedIn: "root",
})
export class SigninService {

  constructor(private http: HttpClient) { }

  requestSignin(credentials: UserCredentials): Promise<any> {
    return this.http.post("http://localhost:3000/api/auth/signin", credentials, {responseType: "json"}).toPromise();
  }

}