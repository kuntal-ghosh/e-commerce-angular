import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  cartItemsCount = 0;

  constructor(
    private cartService: CartService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  toggleCart(): void {
    this.uiService.toggleCart();
  }
}
