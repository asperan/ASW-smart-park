import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

const baseUrl = "http://localhost:3000/api";
const messagesUrl = baseUrl + "/messages";

describe('MessagesService', () => {
  let httpTestingController: HttpTestingController;
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MessagesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#addNewEmailMessage', () => {
    service.addNewEmailMessage({
      body: "",
      receiver: "",
      sender: "",
      subject: "",
      type: "",
    }).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const testRequest = httpTestingController.expectOne(messagesUrl + "/add");
 
    testRequest.flush({});
  });
});
