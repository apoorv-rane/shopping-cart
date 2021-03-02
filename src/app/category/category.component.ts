import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../shared/cart/cart.service';
import { CategoryService } from '../shared/category/category.service';
import { Product } from '../shared/product/product';
import { ProductService } from '../shared/product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
    private categoryApi: CategoryService,
    private productApi: ProductService,
    private cartService: CartService) {
      // route.queryParams.subscribe(params => {
      //   this.categoryId = params.categoryId;
      //   this.loadCategories();
      //   this.loadCategory();
      //   this.loadProducts();
      // });
  }

  categoryId: number;
  category: any = {};
  categoryList: any;
  productList: any;

  ngOnInit(): void {
    console.warn("Component created")
    this.categoryApi.categoryId.subscribe(x =>{
      this.categoryId = x
      this.loadCategories();
      this.loadCategory();
      this.loadProducts();
    });
  }

  ngOnDestroy(): void {
    console.warn("Component destroyed")
    this.categoryApi.categoryId?.unsubscribe();
  }

  loadCategories() {
    return this.categoryApi.getCategories().subscribe((data: {}) => {
      this.categoryList = data;
    })
  }

  loadCategory(){
    return this.categoryApi.getCategory(this.categoryId).subscribe((data: {}) => {
      this.category = data;
    })
  }

  loadProducts(){
    return this.productApi.getProducts(this.categoryId).subscribe((data: {}) => {
      this.productList = data;
    })
  }

  categoryClicked(categoryId){
    // this.categoryApi.categoryIdObserved(categoryId)
    this.categoryApi.categoryId.next(categoryId);
  }

  addItem(product: Product){
    this.cartService.addItem(product, 1)
  }
  
}
