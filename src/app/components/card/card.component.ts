import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private _product!: Product;
  constructor(
    private readonly cartService: CartService
  ) {
    console.log("Card component initialized",this._product);
  }


ngOnInit(): void {
  // Runs once after first ngOnChanges
  // Ideal for initialization logic
  console.log('3. OnInit called');
  console.log("Card component initialized in ngOnInit",this._product);

}


  @Input()
  get product(): Product {
    return this._product;
  }

  set product(value: Product) {
    this._product = { ...value };
  }

  @Output() productChange = new EventEmitter<Product>();

  updateProduct(changes: Partial<Product>): void {
    this._product = {
      ...this._product,
      ...changes
    };
    this.productChange.emit(this._product);
  }

  onMouseEnter(): void {
    this.updateProduct({ isHovered: true });
    console.log('Mouse enter',this._product);
  }

  onMouseLeave(): void {
    this.updateProduct({ isHovered: false });
    console.log('Mouse leave',this._product);

  }

  addToCart(): void {
    this.cartService.addToCart(this._product);
  }
}
