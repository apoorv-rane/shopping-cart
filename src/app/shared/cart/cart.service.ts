import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../product/product';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  
  cartItems = new BehaviorSubject<Item[]>(localStorage.getItem('cartItems') == null ? [] : JSON.parse(localStorage.getItem('cartItems')))

  addItem(product: Product, quantity: number){
    let price = product.ProductPrice
    if(quantity != 1){
      price = price*quantity
    }
    let items: Item[] = (localStorage.getItem('cartItems') == null ? [] : JSON.parse(localStorage.getItem('cartItems')))
    let itemAdded = false
    items.forEach( (obj) => {
      if(obj.Product.ProductId == product.ProductId){
        obj.Quantity += quantity
        obj.Price += price
        itemAdded = true
      }
    })
    if(itemAdded == false){
      let item: Item = {
        Product: product,
        Quantity: quantity,
        Price: price,
      }
      items.push(item)
    }
    localStorage.setItem('cartItems', JSON.stringify(items))
    this.cartItems.next(items)
  }

  removeItem(item: Item){
    let items: Item[] = (JSON.parse(localStorage.getItem('cartItems')))
    items.forEach( (obj, index) => {
      if(obj.Product.ProductId == item.Product.ProductId)
        items.splice(index,1);
    })
    localStorage.setItem('cartItems', JSON.stringify(items))
    this.cartItems.next(items)
  }

  updateItem(item: Item, quantity: number){
    if(quantity == 0){
      this.removeItem(item)
    }
    else{
      let price = item.Product.ProductPrice*quantity
      let items: Item[] = (JSON.parse(localStorage.getItem('cartItems')))
      items.forEach((obj) => {
        if(obj.Product.ProductId == item.Product.ProductId){
          obj.Quantity = quantity
          obj.Price = price
        }
      })
      localStorage.setItem('cartItems', JSON.stringify(items))
      this.cartItems.next(items)
    }
  }
}
