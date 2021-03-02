import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from '../shared/cart/cart.service';
import { Item } from '../shared/cart/item';
import { Product } from '../shared/product/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private formBuilder: FormBuilder) { }

  cartItems: Item[] = []
  total: number = 0
  count: number = 0
  
  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res => {
      this.cartItems = res
      this.total = 0
      this.count = 0
      this.cartItems.forEach(a => this.total += a.Price)
      this.cartItems.forEach(a => this.count += a.Quantity)
    })
  }

  updateForm = this.formBuilder.group({
    Quantity: ['', [Validators.required, Validators.min(1)]]
  })

  get Quantity(){return this.updateForm.get('Quantity')}

  updateItem(item: Item){
    this.cartService.updateItem(item, this.updateForm.controls['Quantity'].value)
  }

  removeItem(item: Item){
    this.cartService.removeItem(item)
  }

}
