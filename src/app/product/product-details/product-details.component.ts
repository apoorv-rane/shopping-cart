import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/shared/category/category.service';
import { ProductService } from '../../shared/product/product.service';

@Component({
  selector: 'product-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private productApi: ProductService, private categoryApi: CategoryService) { }

  productId: number;
  product: any = {};
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['product-id']
      this.loadProduct()
    })
  }

  loadProduct(){
    return this.productApi.getProduct(this.productId).subscribe((data: {}) => {
      this.product = data
    })
  }

  categoryClicked(categoryId){
    // this.categoryApi.categoryIdObserved(categoryId);
    this.categoryApi.categoryId.next(categoryId)
  }

}
