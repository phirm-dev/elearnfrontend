import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert';
import { EnquireUniportService } from '../enquire-uniport.service';
import { CartService } from '../cart-service.service'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems;
  lengthOfCart = this.cartService.lengthOfCart;
  cartPrice;
  helper = new JwtHelperService();
  user;

  constructor(private cartService: CartService, private service: EnquireUniportService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItemsFromCart();

    this.cartPrice = this.cartService.addPriceOfItems();

    var token = localStorage.getItem('token');
    if (token) {
      var isTokenExpired = this.helper.isTokenExpired(token);
      if (isTokenExpired == true) {
        localStorage.removeItem('token');
      }
      this.user = this.helper.decodeToken(token);
    }
  }

  ngOnDestroy() {
    this.cartPrice = this.cartService.revertPriceOfCart();
  }

  removeFromCart(item) {
    swal('warning', "Are you sure you want to remove this item from your cart?", 'warning', {
      buttons: ["No", "Yes"],
    }).then(value => {
      if (value == true) {
        this.cartService.removeItemFromCart(item);
        swal("Info", "Removed from cart", "warning");
      } else if (value == null) {
        swal('You Declined!');
      }
    })
  }

  payFromCart() {
    var ids = [];
    this.cartItems.forEach(item => {
      ids.push(item._id);
    });
    this.service.buyFromCart(ids);
  }

  addNumber(num) {
    return num + 1;
  }


}
