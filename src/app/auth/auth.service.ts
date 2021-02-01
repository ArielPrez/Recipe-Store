import { Router } from '@angular/router';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Subject } from 'rxjs';

export interface AuthResponseData {
  // A Firebase Auth ID token for the newly created user.
  idToken:	string;
  // The email for the newly created user.
  email:	string;
  // A Firebase Auth refresh token for the newly created user.
  refreshToken:	string;
  // The number of seconds in which the ID token expires.
  expiresIn:	string;
  // The uid of the newly created user.
  localId:	string;
  // Whether the email is for an existing account.
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  signup(email: string, passw: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9h9Wj9REMoBcsyoUxczZmJxGoOlgqV2c',
      {
        email: email,
        password: passw,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
    tap(
      (resData) => {
        this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }

  login(email: string, passw: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9h9Wj9REMoBcsyoUxczZmJxGoOlgqV2c',
      {
        email: email,
        password: passw,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError),
    tap(
      (resData) => {
        this.handleUser(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }
    ));
  }

  autoLogin() {
    const userLocalStoraged: {
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userLocalStoraged) {
      return;
    }

    const loggedUser = new User(
    userLocalStoraged.email,
    userLocalStoraged.id,
    userLocalStoraged._token,
    new Date(userLocalStoraged._tokenExpirationDate)
    );

    if ( loggedUser.token ) {
      this.user.next(loggedUser);
      const timeToExpiration =
        new Date(userLocalStoraged._tokenExpirationDate).getTime()
          - new Date().getTime();
      this.autoLogout(timeToExpiration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }
    this.expirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  // Method to handle the user authentication using the model,
  // with the respective data including an expiration date.
  private handleUser(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  // Method to handle the errors, through the pipe so to change the response.
  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unkown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
      default:
        break;
      }
    return throwError(errorMessage);
  }

}
