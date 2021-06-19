import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenManagerService } from '../access-token/token-manager';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl = "http://localhost:3000/api";
  private messagesUrl = this.baseUrl + "/messages";

  constructor(private http: HttpClient) {
  }

  addNewEmailMessage(message: Message): Observable<Message> {
    const messageDto: Message = {
      type: "email",
      sender: message.sender,
      receiver: message.receiver,
      subject: message.subject,
      body: message.body
    }
    return this.http.post<Message>(this.messagesUrl + "/add", messageDto);
  }

}

export type Message = {
  type: string,
  sender: string,
  receiver: string,
  subject: string,
  body: string
}