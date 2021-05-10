import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import UserCredentials from "./user-credentials";

@Injectable({
  providedIn: "root",
})
export class SignupService {

  constructor(private http: HttpClient) { }

  requestSignup(credentials: UserCredentials): Promise<any> {
    return this.http.post("http://localhost:3000/api/auth/signup", JSON.stringify(credentials), {responseType: "json"}).toPromise();
  }

}