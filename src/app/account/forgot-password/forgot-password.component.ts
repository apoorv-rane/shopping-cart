import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.forgotForm
  }

  forgotForm = this.formBuilder.group({
    UserEmail: ['', [Validators.required, Validators.email]]
  })

  get UserEmail(){return this.forgotForm.get('UserEmail')}

  forgot(){
    this.userService.ForgotPassword(this.forgotForm.value).subscribe((data: {}) => {
      if(data == 'True'){
        this.userService.forgotEmail = this.forgotForm.controls['UserEmail'].value
        this.router.navigate(['account/reset'])
      }
      else{
        this.toastr.error('Please enter registered email','Email Id not found')
      }
    })
  }
}
