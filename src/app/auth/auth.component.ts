import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuth(form: NgForm) {

    if (!form.valid) {
      return;
    }
    const emailTo = form.value.email;
    const passw = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObservable = this.authService.login(emailTo, passw);
    } else {
      authObservable = this.authService.signup(emailTo, passw);
    }

    authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      }, errorMsg => {
        console.log(errorMsg);
        this.error = errorMsg;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
