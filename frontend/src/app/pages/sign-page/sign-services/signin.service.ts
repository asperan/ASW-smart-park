import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import UserCredentials from "./user-credentials";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class SigninService {

  constructor(private http: HttpClient) { }

  requestSignin(credentials: UserCredentials): Promise<any> {
    return this.http.post(environment.baseUrl + "/auth/signin", credentials, {responseType: "json"}).toPromise();
  }

}
