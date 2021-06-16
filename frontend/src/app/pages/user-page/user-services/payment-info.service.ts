import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class PaymentInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) {}

  async requestPaymentInfos(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user-info/payments", {headers: {"x-access-token": await this.tokenManagerService.getToken()}}).toPromise();
  }
}
