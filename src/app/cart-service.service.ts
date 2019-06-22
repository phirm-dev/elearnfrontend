import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];

  addToCart(item) {
    var index = this.cart.indexOf(item);
    if(index !== -1){
      return false;
    }
    this.cart.push(item);
    console.log(this.cart);
    return true;
  }

  getItemsFromCart() {
    return this.cart;
  }

  removeItemFromCart(item) {
    let index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
  }
}
