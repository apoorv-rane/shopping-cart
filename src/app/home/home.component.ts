import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/cart/cart.service';
import { Item } from '../shared/cart/item';
import { Product } from '../shared/product/product'
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productApi: ProductService, private cartService: CartService) { }

  featuredProductList: any = [];
  
  ngOnInit(): void {
    this.loadFeaturedProducts()
  }

  loadFeaturedProducts(){
    this.productApi.getFeaturedProducts().subscribe(( data: {}) => {
      this.featuredProductList = data
    })
  }

  addItem(product: Product){
    this.cartService.addItem(product, 1)
  }
}
