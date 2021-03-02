import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../shared/cart/cart.service';
import { Item } from '../shared/cart/item';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService) { }
  
  cartItems: Item[] = []
  total: number = 0
  count: number = 0
  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res => {
      this.cartItems = res
      if(this.cartItems.length == 0){
        this.toastr.clear()
        this.toastr.info('Add some items to cart in order to checkout', 'Empty Cart')
        this.router.navigate([''])
      }
      this.total = 0
      this.count = 0
      this.cartItems.forEach(a => this.total += a.Price)
      this.cartItems.forEach(a => this.count += a.Quantity)
    })
  }

}
