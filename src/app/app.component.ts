import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { Product } from './models/product.interface';
import { CartComponent } from './components/cart/cart.component';
import { MOCK_PRODUCTS } from '../app/mock/mock-products';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent,CartComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {

constructor(public authService: AuthService) {

}


}
