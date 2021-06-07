import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  types = ['parking', 'payment', 'other'];

  isSubmitted: boolean = false;

  requestType: string | undefined;
  requestText: string = "";

  constructor(private route: ActivatedRoute, private messagesService: MessagesService) {
    this.route.queryParams.subscribe(params => {
      this.requestType = params['template'] && this.types.includes(params['template']) ? params['template'] : 'parking';
    });
  }

  ngOnInit(): void {
  }

  submitSupport() {
    this.messagesService.addNewEmailMessage(this.makeEmail()).subscribe(
      (res => {

      }),
      (err => {
        console.error("Could not send new message: " + JSON.stringify(err));
      })
    );
    this.isSubmitted = true;
  }

  makeEmail(): Message {
    return {
      sender: "support-bot@noreply-smarkPark.com",
      receiver: "support@smartPark.com",
      subject: "Support - " + this.requestType +" - " + "", // TODO ADD USER ID HERE
      body: this.requestText
    }
  }

}
