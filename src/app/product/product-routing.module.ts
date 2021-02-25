import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductComponent } from './product.component';
import { SearchResultsComponent } from './search-results/search-results.component';

const productRoutes: Routes = [
  { 
    path: '',
    component: ProductComponent,

    children: [
      {
        path: ':product-id',
        component: ProductDetailsComponent,
      },
      {
        path: 'product-details/:product-id',
        redirectTo: ':product-id'
      },
      {
        path: 'search/:search-string',
        component: SearchResultsComponent,
      }
    ]
	}
];

@NgModule({
  imports: [RouterModule.forChild(productRoutes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
