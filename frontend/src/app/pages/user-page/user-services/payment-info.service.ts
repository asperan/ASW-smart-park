import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenManagerService } from "src/app/access-token/token-manager";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class PaymentInfoService {
  constructor(private http: HttpClient, private tokenManagerService: TokenManagerService) { }

  async requestPermanenceInfos(): Promise<any> {
    return this.http.get(environment.baseUrl + "/user/info-permanences", { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  async postPermanenceInfo(price: number, paymentId: string, hours: number, minutes: number): Promise<any> {
    return this.http.post(environment.baseUrl + "/user/info-permanences", { entryDate: Date.now(), payedForMillis: (this.convertHoursToMillis(hours) + this.convertMinutesToMillis(minutes)), paymentId: paymentId, amount: price }, { headers: { "x-access-token": this.tokenManagerService.getToken() } }).toPromise();
  }

  private convertHoursToMillis(hours: number): number {
    return this.convertMinutesToMillis(hours * 60);
  }

  private convertMinutesToMillis(minutes: number): number {
    return minutes * 60 * 1000;
  }
}