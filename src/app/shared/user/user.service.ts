import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loggedInUser: User = null
  forgotEmail: string = ''
  userUrl = "https://localhost:44381/User/"
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addUser(user): Observable<User> {
  return this.http.post<User>(this.userUrl + "Register", JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      // catchError(this.handleError)
    )
  }

  checkExistingUser(userEmail: string): Promise<User[]>{
    return this.http.post<User[]>(this.userUrl + "CheckExistingEmail", JSON.stringify({UserEmail : userEmail}), this.httpOptions).toPromise();
  }

  loginUser(user): Observable<User> {
    return this.http.post<User>(this.userUrl + "Login", JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  checkLogin(): Observable<User> {
    return this.http.get<User>(this.userUrl + "CheckLogin")
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  ForgotPassword(user): Observable<User> {
    return this.http.post<User>(this.userUrl + "ForgotPassword", JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }

  ResetPassword(user): Observable<User> {
    return this.http.post<User>(this.userUrl + "ResetPassword", JSON.stringify(user), this.httpOptions)
      .pipe(
        retry(1),
        // catchError(this.handleError)
      )
  }


  // handleError(error) {
  //   let errorMessage = '';
  //   if(error.error instanceof ErrorEvent) {
  //     // Get client-side error
  //     errorMessage = error.error.message;
  //   } else {
  //     // Get server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   window.alert(errorMessage);
  //   return throwError(errorMessage);
  // }
}
