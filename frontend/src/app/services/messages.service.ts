import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private baseUrl = "http://localhost:3000/api";
  private messagesUrl = this.baseUrl + "/messages";

  constructor(private http: HttpClient) {
  }

  addNewEmailMessage(message: Message): Observable<MessageDto> {
    const messageDto: MessageDto = {
      type: "email",
      sender: message.sender,
      receiver: message.receiver,
      subject: message.subject,
      body: message.body
    }
    return this.http.post<MessageDto>(this.messagesUrl + "/add", messageDto);
  }

}

export type Message = {
  sender: string,
  receiver: string,
  subject: string,
  body: string
}

export type MessageDto = {
  type: string,
  sender: string,
  receiver: string,
  subject: string,
  body: string
}
