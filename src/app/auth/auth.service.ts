import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

//yo ni tei website mae xa 
export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpirationTimer: any;

  //using firebase for signup/signin /tokens

  //            WEBSITE :>
  // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password


  // yo url ma chae post garne. API key vaneko hamro API ko key ho edi firebase use gardae xam vane. 
  //tyo key hamle firebase ko project settings ma pauxam

  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt8umgz5W2UuaYfd5l7c-KTr5u1Gi2c3A


  constructor(private http: HttpClient, private router: Router) { }

  // userSubject = new Subject<User>();
  userSubject = new BehaviorSubject<User>(null);

  signUpUser(userEmail: string, userPassword: string) {
    //kun type ko response pauxa vanera website ma deko xa so tei datatype deko matrae ho .It is a good approach but optional
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCt8umgz5W2UuaYfd5l7c-KTr5u1Gi2c3A', {
      //yo 3 ota chainxa vanera mathi ko website ma deko xa
      email: userEmail,
      password: userPassword,
      returnSecureToken: true
    })
      .pipe
      (catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        }
        ));

  }

  loginUser(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCt8umgz5W2UuaYfd5l7c-KTr5u1Gi2c3A', {
      email: email,
      password: password,
      returnSecureToken: true
    })
      .pipe
      (catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn);
        }
        ));
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;


  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, idToken: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, idToken, expirationDate);
    this.userSubject.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }


  private handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An Unknown Error Occured!';
    if (!errorRes.error && !errorRes.error.error) {
      //return an Observable
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email Doesnot Exists!';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Alreadys Exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The Password is incorrect!';
        break;
    }
    return throwError(errorMessage);

  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {

      this.userSubject.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); //in milliseconds
      this.autoLogout(expirationDuration);
    }
  }


}
