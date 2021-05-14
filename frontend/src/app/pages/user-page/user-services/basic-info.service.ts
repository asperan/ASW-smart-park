import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getToken } from "src/app/access-token/token-manager";

@Injectable({
  providedIn: "root",
})
export class BasicInfoService {
  constructor(private http: HttpClient) {}

  requestBasicInfos(): Promise<any> {
    return this.http.post("http://localhost:3000/api/user-info/basic", {}, {headers: {"x-access-token": getToken()}}).toPromise();
  }
}