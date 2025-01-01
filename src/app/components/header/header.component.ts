import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-8">
            <a href="#" class="text-xl font-bold text-gray-800">Store</a>
            <div class="hidden md:flex space-x-4">
              <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" class="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              (click)="toggleCart()"
              class="relative p-2 text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              @if (cartItemsCount > 0) {
                <span class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {{ cartItemsCount }}
                </span>
              }
            </button>
          </div>
        </div>
      </div>
    </nav>
  `
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
