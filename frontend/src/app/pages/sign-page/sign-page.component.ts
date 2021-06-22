import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { SignupService } from './sign-services/signup.service';
import { SigninService } from "./sign-services/signin.service";
import UserCredentials from './sign-services/user-credentials';
import * as SignErrors from "./sign-errors";
import { TokenManagerService } from "../../access-token/token-manager";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from "../../notifications/notification.service";

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.css']
})
export class SignPageComponent implements OnInit {

  isSignup!: boolean;
  signError: SignErrors.SignError;
  errorMessage: string;

  faUser = faUser;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private signupService: SignupService,
    private signinService: SigninService,
    private tokenManagerService: TokenManagerService,
    private notificationService: NotificationService) { 
      this.signError = SignErrors.None.None;
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
      //alert("You are subscribed! You will be redirected to sing in page where you can log in.");
      router.navigate(['signin']);
    }, reason => this.onRequestError(reason.error));
  }

  private onSubmitSignin(userCredentials: UserCredentials): void {
    const router = this.router;
    this.signinService.requestSignin(userCredentials).then(data => {
      this.tokenManagerService.setToken(data.access_token);
      this.notificationService.subcribeToPushNotification().then((response: any) => {
        if(response.code === 0) {
          router.navigate(["userpage"]); 
        } else {
          this.tokenManagerService.setToken("");
          this.onRequestError(response);
        }
      });
    }, reason => this.onRequestError(reason.error));
  }

  private onRequestError(error: any) {
    this.signError = error.code;
    this.errorMessage = SignErrors.errorMessages[this.signError];
  }
}