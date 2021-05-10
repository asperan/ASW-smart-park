import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SignupService } from './sign-services/signup.service';
import { SigninService } from "./sign-services/signin.service";
import UserCredentials from './sign-services/user-credentials';
import * as SignErrors from "./sign-errors";

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.css']
})
export class SignPageComponent implements OnInit {

  isSignup!: boolean;
  signError: SignErrors.SignError;
  errorMessage: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private signupService: SignupService,
    private signinService: SigninService) { 
      this.signError = SignErrors.Common.ServerError;
      this.errorMessage = SignErrors.errorMessages[this.signError];
    }

  onSubmit(data: any) {
    const userCredentials: UserCredentials = { email: data.email, password: data.password };
    if(this.isSignup) {
      this.onSubmitSignup(userCredentials);
    } else {
      this.onSubmitSignin(userCredentials);
    }
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => this.isSignup = data.isSignup);
  }

  private onSubmitSignup(userCredentials: UserCredentials): void {
    const router = this.router;
    this.signupService.requestSignup(userCredentials).then(data => {
      if (data.code > 0) {
        this.onRequestError(data);
      } else {
        alert("You are subscribed! You will be redirected to sing in page where you can log in.");
        router.navigate(['signin']);
      }
    });
  }

  private onSubmitSignin(userCredentials: UserCredentials): void {
    const router = this.router;
    this.signinService.requestSignin(userCredentials).then(data => {
      if (data.code > 0) {
        this.onRequestError(data);
      } else {
        // TODO:
        // Redirect to user page
      }
    });
  }

  private onRequestError(error: any) {
    this.signError = error.code;
    this.errorMessage = SignErrors.errorMessages[this.signError];
  }
}