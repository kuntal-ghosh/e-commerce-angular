import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';

export const Auth_ROUTES: Routes = [
  {
    path: 'users',
    component: UserListComponent
  },
  // {
  //   path: ':id',
  //   component: ProductListComponent
  // }
];
