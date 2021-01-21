import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  signup(email: string, passw: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9h9Wj9REMoBcsyoUxczZmJxGoOlgqV2c',
      {
        email: email,
        password: passw,
        returnSecureToken: true
      }
    ).pipe(
      catchError(
        (errorRes) => {
          let errorMessage = 'An unkown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already.';
              break;
            default:
              break;
            }
          return throwError(errorMessage);
        }
      )
    );
  }

  login(email: string, passw: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9h9Wj9REMoBcsyoUxczZmJxGoOlgqV2c',
      {
        email: email,
        password: passw,
        returnSecureToken: true
      }
    );
  }

}
