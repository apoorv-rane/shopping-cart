import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canLoad(route: Route): boolean {
    let url: string = route.path
    console.log('Url:'+ url)
    if (this.authService.isUserLoggedIn()) {
       return true;
    }
      this.authService.setRedirectUrl(url)
      this.router.navigate([ this.authService.getLoginUrl() ])
      this.toastr.clear()
      this.toastr.info('', 'Login Required');
      return false
    }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let url: string = state.url
    console.log('Url:' + url)
    if (this.authService.isUserLoggedIn()) {
      return true
    }
    this.authService.setRedirectUrl(url);
    this.router.navigate([this.authService.getLoginUrl()])
    this.toastr.clear()
    this.toastr.info('', 'Login Required')
    return false
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let loggedInUser = this.authService.getLoggedInUser()
    if (loggedInUser.roleId === 1) {
      return true
    } else {
      this.toastr.clear()
      this.toastr.error('You are not authorized to access this page')
      return false
    }
  }
}
