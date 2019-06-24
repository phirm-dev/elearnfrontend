import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  lengthOfCart = 0;

  addToCart(item) {
    var index = this.cart.indexOf(item);
    if(index !== -1){
      return false;
    }
    this.cart.push(item);
    this.lengthOfCart ++;
    // console.log(this.cart);
    return true;
  }

  getItemsFromCart() {
    return this.cart;
  }

  removeItemFromCart(item) {
    let index = this.cart.indexOf(item);
    this.lengthOfCart --;
    this.cart.splice(index, 1);
  }

  getLengthOfCart(){
    return this.lengthOfCart;
  }
}
