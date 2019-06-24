import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { EnquireUniportService } from '../enquire-uniport.service';
import { CartService } from '../cart-service.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItemsFromCart();
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

}
