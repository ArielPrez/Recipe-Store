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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
      this.isLoginMode = !this.isLoginMode;
  }

  onSubmitAuth(form: NgForm) {
    const emailTo = form.value.email;
    const passw = form.value.password;

    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(emailTo, passw).subscribe(
        (resData) => {
          console.log(resData);
        }, error => {
          console.log(error);
        }
      );
    }

    form.reset();
  }
}
