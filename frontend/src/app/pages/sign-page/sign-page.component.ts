import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.css']
})
export class SignPageComponent implements OnInit {

  isSignup!: boolean;

  constructor(private route: ActivatedRoute, ) { }

  onSubmit(data: Object) {
    console.log(data);
    // TODO: 
    // Use service to login
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.isSignup = data.isSignup);
  }

}
