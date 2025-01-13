import { Component } from '@angular/core';
import { CardComponent } from "../../../../components/card/card.component";
import { MOCK_PRODUCTS } from '../../../../mock/mock-products';
import { Product } from '../../../../models/product.interface';

@Component({
  selector: 'app-product-list',
  imports: [CardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
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
