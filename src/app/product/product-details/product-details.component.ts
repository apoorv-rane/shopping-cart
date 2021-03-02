import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/cart/cart.service';
import { CategoryService } from 'src/app/shared/category/category.service';
import { Product } from 'src/app/shared/product/product';
import { ProductService } from '../../shared/product/product.service';

@Component({
  selector: 'product-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private productApi: ProductService,
    private categoryApi: CategoryService,
    private formBuilder: FormBuilder,
    private cartService: CartService) { }

  productId: number;
  product: any = {};

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['product-id']
      this.loadProduct()
    })
    this.addForm
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

  addForm = this.formBuilder.group({
    Quantity: ['', [Validators.required, Validators.min(1)]]
  })

  get Quantity(){return this.addForm.get('Quantity')}

  addItem(product: Product){
    this.cartService.addItem(product, this.addForm.controls['Quantity'].value)
    this.addForm.reset()
  }

}
