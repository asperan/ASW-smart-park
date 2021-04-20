import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  constructor(private http: HttpClient) { }

  getApiMessage() {
    return this.http.get("http://localhost:3000", {responseType: "json"});
  }
}
