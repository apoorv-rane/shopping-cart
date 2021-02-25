import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product/product'
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private productApi: ProductService) { }

  featuredProductList: any = [];
  
  ngOnInit(): void {
    this.loadFeaturedProducts()
  }

  loadFeaturedProducts(){
    this.productApi.getFeaturedProducts().subscribe(( data: {}) => {
      this.featuredProductList = data
    })
  }
}
