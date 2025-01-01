import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.interface';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [], total: 0 };
  private cartSubject = new BehaviorSubject<Cart>(this.cart);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: Product): void {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.items.push({ product, quantity: 1 });
    }

    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  private updateCart(): void {
    this.cart.total = this.cart.items.reduce(
      (total, item) => total + (item.product.price * item.quantity),
      0
    );
    this.cartSubject.next({ ...this.cart });
  }

  getCart(): Cart {
    return this.cart;
  }

  clearCart(): void {
    this.cart = { items: [], total: 0 };
    this.cartSubject.next(this.cart);
  }
}
