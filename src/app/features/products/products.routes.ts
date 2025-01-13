import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  // {
  //   path: ':id',
  //   component: ProductListComponent
  // }
];
