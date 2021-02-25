import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { existingEmailValidator } from 'src/app/shared/custom-validator/existing-email-validator';
import { DialogService } from 'src/app/shared/deactivate/dialog.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userApi: UserService,
    private router: Router,
    private toastr: ToastrService,
    public dialogService: DialogService ) { }

  isUpdating = false

  ngOnInit(): void {
    this.registerForm
  }

  registerForm = this.formBuilder.group({
    FirstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-z]*")]],
    LastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern("[A-Za-z]*")]],
    UserEmail: ['', [Validators.required, Validators.maxLength(50), Validators.email], [existingEmailValidator(this.userApi)]],
    UserMobile: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern("[0-9]*")]],
    UserAddress: this.formBuilder.array([this.createAddress()]),
    // UserAddress: ['', [Validators.required, Validators.maxLength(1000)]],
    UserPassword: ['', [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,14}$")]],
    ConfirmPassword: ['', [Validators.required]],
  })

  get FirstName(){return this.registerForm.get('FirstName')}
  get LastName(){return this.registerForm.get('LastName')}
  get UserEmail(){return this.registerForm.get('UserEmail')}
  get UserMobile(){return this.registerForm.get('UserMobile')}
  get UserAddress(){return this.registerForm.get('UserAddress') as FormArray}
  // get UserAddress(){return this.registerForm.get('UserAddress')}
  get ConfirmPassword(){return this.registerForm.get('ConfirmPassword')}
  get UserPassword(){return this.registerForm.get('UserPassword')}

  createAddress(): FormGroup {
    return this.formBuilder.group({
      Line1: '',
      Line2: '',
      City: '',
      PinCode: ''
    })
  }

  addAddress(): void {
    this.UserAddress.push(this.createAddress())
  }

  removeAddress(i){
    this.UserAddress.removeAt(i)
  }

  registerUser() {
    this.isUpdating = true
    return this.userApi.addUser(this.registerForm.value).subscribe((data: {}) => {
      if(data == 'success'){
        this.registerForm.reset()
        this.toastr.success('You may proceed to login', 'Registration Successful')
        this.router.navigate([''])
      }
      else{
        this.toastr.error('Something unexpected happened', 'Registration Failed')
      }
    })
  }

  canDeactivate(): Observable<boolean> | boolean {

    if (this.registerForm.dirty) {
        return this.dialogService.confirm('Are you sure?');
    }
    return true;
  }	
  
}
