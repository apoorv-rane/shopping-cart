import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart/cart.service';
import { Item } from 'src/app/shared/cart/item';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit {

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

  removeItem(item: Item){
    this.cartService.removeItem(item)
  }

}
