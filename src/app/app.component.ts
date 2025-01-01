import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { Product } from './models/product.interface';
import { CartComponent } from './components/cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, CardComponent,CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'e-commerce-angular';
  products: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      description: 'This is a sample product description',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Another amazing product description',
      price: 149.99,
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Product 3',
      description: 'Third product description here',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/300x200'
    }
  ,
  {
    id: 4,
    title: 'Product 4',
    description: 'Fourth product description here',
    price: 249.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 5,
    title: 'Product 5',
    description: 'Fifth product description here',
    price: 299.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 6,
    title: 'Product 6',
    description: 'Sixth product description here',
    price: 349.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 7,
    title: 'Product 7',
    description: 'Seventh product description here',
    price: 399.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 8,
    title: 'Product 8',
    description: 'Eighth product description here',
    price: 449.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 9,
    title: 'Product 9',
    description: 'Ninth product description here',
    price: 499.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  },
  {
    id: 10,
    title: 'Product 10',
    description: 'Tenth product description here',
    price: 549.99,
    imageUrl: 'https://via.placeholder.com/300x200'
  }
  ];
}
