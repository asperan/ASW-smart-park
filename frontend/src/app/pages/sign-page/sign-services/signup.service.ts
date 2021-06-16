import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import UserCredentials from "./user-credentials";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class SignupService {

  constructor(private http: HttpClient) { }

  requestSignup(credentials: UserCredentials): Promise<any> {
    return this.http.post(environment.baseUrl + "/auth/signup", credentials, {responseType: "json"}).toPromise();
  }

}
