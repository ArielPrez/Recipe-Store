import { AuthService } from './auth.service';
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
    this.isLoading = true;
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(emailTo, passw).subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
        }, errorMsg => {
          console.log(errorMsg);
          this.error = errorMsg;
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
