import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.resetForm.patchValue({
    UserEmail: this.userService.forgotEmail
    })
  }

  resetForm = this.formBuilder.group({
    UserEmail: [''],
    UserPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,14}$")]],
    ConfirmPassword: ['', [Validators.required]],
  })

  get UserPassword(){return this.resetForm.get('UserPassword')}
  get ConfirmPassword(){return this.resetForm.get('ConfirmPassword')}

  reset(){
    this.userService.ResetPassword(this.resetForm.value).subscribe((data: {}) => {
      if(data == "Success"){
        this.toastr.success('You may proceed to login','Password changed successfully')
        this.router.navigate(['account/login'])
      }
      if(data == "Failed"){
        this.toastr.error('Please try again','Something went wrong')
      }
    })
  }

}
