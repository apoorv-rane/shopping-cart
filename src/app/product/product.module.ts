import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';


@NgModule({
  declarations: [ProductComponent, ProductDetailsComponent, SearchResultsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
  ]
})
export class ProductModule {
  constructor(){
    console.log('Product Module Loaded')
  }
}
