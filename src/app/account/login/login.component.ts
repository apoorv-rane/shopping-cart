import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/user/user';
import { UserService } from '../../shared/user/user.service';

@Component({
  selector: 'account-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userApi: UserService, private router: Router, private toastr: ToastrService, private authService: AuthService) { }

  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      UserEmail: new FormControl('', Validators.required),
      UserPassword: new FormControl('', Validators.required)
    })
  }

  loginUser(){
    return this.userApi.loginUser(this.loginForm.value).subscribe((data: User) => {
      if(data != null){
        localStorage.setItem('userId', data.UserId.toString())
        localStorage.setItem('roleId', data.RoleId.toString())
        localStorage.setItem('isLoggedIn', 'true')
        this.authService.isUserAuthenticated()
        this.loginForm.reset()
        this.toastr.clear()
        this.toastr.success('', 'Login Successful')
        this.router.navigate([''])
      }
      else{
        this.toastr.clear()
        this.toastr.error('Incorrect email or password', 'Login Failed')
      }
    })
  }

  get UserEmail(){return this.loginForm.get('UserEmail')}
  get UserPassword(){return this.loginForm.get('UserPassword')}

}
