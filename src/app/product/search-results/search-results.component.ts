import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart/cart.service';
import { Product } from 'src/app/shared/product/product';
import { ProductService } from 'src/app/shared/product/product.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private productApi: ProductService, private cartService: CartService) { }

  searchedProducts: any;
  
  ngOnInit(): void {
    this.productApi.searchResults.subscribe(data =>{
      this.searchedProducts = data
    })
  }

  addItem(product: Product){
    this.cartService.addItem(product, 1)
  }

}
