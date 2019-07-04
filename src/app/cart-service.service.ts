import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  lengthOfCart = 0;
  price = 0;

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

  addPriceOfItems(){
    for(let i = 0; i < this.cart.length ; i ++){
      console.log(this.cart[i].course_price/100);
      this.price += this.cart[i].course_price/100;
    }
    return this.price;
  }

  revertPriceOfCart(){
    this.price = 0;
    return this.price;
  }

  payFromCart(){
    
  }
}
