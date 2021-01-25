import { User } from './user.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

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

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

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
