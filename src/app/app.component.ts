import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { Product } from './models/product.interface';
import { CartComponent } from './components/cart/cart.component';
import { MOCK_PRODUCTS } from '../app/mock/mock-products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, CardComponent,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-angular';
  products: Product[] = MOCK_PRODUCTS;
  onProductUpdate(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    this.products[index] = updatedProduct;
    console.log('Updated products array:', this.products);
    this.title = updatedProduct.title;

  }
  productChange(product: Product): void {
    console.log('Product changed:', product);
  }



}
