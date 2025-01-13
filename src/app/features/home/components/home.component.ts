import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-6">Welcome to our Store</h1>
      <p class="text-lg text-gray-600">Discover our amazing products</p>
    </div>
  `
})
export class HomeComponent {}
