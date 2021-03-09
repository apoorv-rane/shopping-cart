import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoryComponent } from './category/category.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './shared/auth/auth-guard.service';
import { CanDeactivateGuardService } from './shared/deactivate/can-deactivate-guard.service';
import { CustomPreloadingService } from './shared/preloading/custom-preloading.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'error',
	   component: ErrorHandlerComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'product',
    canLoad: [ AuthGuardService ],
    canActivate: [ AuthGuardService ],
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    data: { preload: true } 
  },
  {
    path: 'order',
    canActivate: [ AuthGuardService ],
    canActivateChild: [ AuthGuardService ],
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
  },
];

@NgModule({
  providers: [ CustomPreloadingService, CanDeactivateGuardService ],
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }