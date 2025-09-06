import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/watches', pathMatch: 'full' },
  { 
    path: 'watches',
    loadComponent: () => import('./components/watch-list/watch-list.component').then(m => m.WatchListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/shopping-cart/shopping-cart.component').then(m => m.ShoppingCartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'watches/:id',
    loadComponent: () => import('./components/watch-detail/watch-detail.component').then(m => m.WatchDetailComponent)
  }
];
