import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuardService } from '../shared/deactivate/can-deactivate-guard.service';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component';

const accountRoutes: Routes = [
  { 
    path: '',
      component: AccountComponent,
      children: [ 
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent,
        canDeactivate: [CanDeactivateGuardService]
      }
    ]
	}
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
