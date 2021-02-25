import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private redirectUrl: string = '/'
	private loginUrl: string = '/account/login'
	private isLoggedIn: boolean = false
	private loggedInUser: any
  getLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem('isLoggedIn') == 'true' ? true : false)

  isUserAuthenticated(): Observable<boolean>{
    if(localStorage.getItem('isLoggedIn') == 'true'){
      this.getLoggedIn.next(true);
      this.isLoggedIn = true;
	    this.loggedInUser = {
        userId: Number(localStorage.getItem('userId')),
        roleId: Number(localStorage.getItem('roleId'))
      }
    }
    else{
      this.isLoggedIn = false
    }
    return of(this.isLoggedIn)
  }

  isUserLoggedIn(): boolean {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') == 'true' ? true : false
    this.getLoggedIn.next(this.isLoggedIn)
		return this.isLoggedIn
	}
	getRedirectUrl(): string {
		return this.redirectUrl
	}
	setRedirectUrl(url: string): void {
		this.redirectUrl = url
	}
	getLoginUrl(): string {
		return this.loginUrl
	}
	getLoggedInUser() {
    this.loggedInUser = {
      userId: parseInt(localStorage.getItem('userId')),
      roleId: parseInt(localStorage.getItem('roleId'))
    }
		return this.loggedInUser
	}
	// logoutUser(): void{
	// 	this.isloggedIn = false;
	// }
}
