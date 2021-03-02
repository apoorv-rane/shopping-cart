import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../shared/cart/cart.service';
import { Item } from '../shared/cart/item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService) { }

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

  updateItem(item: Item, quantity){
    this.cartService.updateItem(item, Number(quantity))
  }

  removeItem(item: Item){
    this.cartService.removeItem(item)
  }

}
