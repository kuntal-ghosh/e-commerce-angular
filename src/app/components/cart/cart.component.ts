import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';
import { Cart } from '../../models/cart.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [], total: 0 };
  isOpen = false;

  constructor(
    private cartService: CartService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });

    this.uiService.isCartOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  toggleCart(): void {
    this.uiService.toggleCart();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    } else {
      this.cartService.removeFromCart(productId);
    }
  }
}
