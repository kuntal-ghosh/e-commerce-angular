import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ProtectedComponent } from './components/protected/protected.component';

export const routes: Routes = [
  // { path: '', component: HomePageComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/home/home.routes').then(m => m.HOME_ROUTES)
  },

  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./features/user/user.routes').then(m => m.USER_ROUTES)
  },
  {
    path: '',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  // {
  //   path: 'cart',
  //   loadChildren: () => import('./features/cart/cart.routes').then(m => m.CART_ROUTES)
  // },
  // {
  //   path: 'checkout',
  //   loadChildren: () => import('./features/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./features/account/account.routes').then(m => m.ACCOUNT_ROUTES)
  // },
    // {
  //   path: '**',
  //   loadChildren: () => import('./features/not-found/not-found.routes').then(m => m.NOT_FOUND_ROUTES)
  // }

];
