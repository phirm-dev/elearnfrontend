import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];

  addToCart(item) {
    this.cart.push(item);
  }

  getItemsFromCart() {
    return this.cart;
  }

  removeItemFromCart(item) {
    let index = this.cart.indexOf(item);
    this.cart.splice(index, 1);
  }
}
