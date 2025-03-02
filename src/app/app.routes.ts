//  import { Component } from '@angular/core';
// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { ProductComponent } from './pages/product/product.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// export const routes: Routes = [
//     {path:'' , redirectTo:'home' , pathMatch:'full'},
//   {
//     path: '' /*يفضل أخلي المسار فاضي*/,
//     component: AuthLayoutComponent,
//     children: [
//       { path: 'login', component: LoginComponent, title: 'login' },
//       { path: 'register', component: RegisterComponent, title: 'register' },
//     ],
//   },
//   {
//     path: '' /*يفضل أخلي المسار فاضي*/,
//     component: BlankLayoutComponent,
//     children: [
//       { path: 'home', component: HomeComponent, title: 'home' },
//       { path: 'cart', component: CartComponent, title: 'cart' },
//       { path: 'products', component: ProductComponent, title: 'products' },
//       { path: 'brands', component: BrandsComponent, title: 'brends' },
//       {
//         path: 'categories',
//         component: CategoriesComponent,
//         title: 'categories',
//       },
//       { path: 'checkout', component: CheckoutComponent, title: 'checkout' },
//     ],
//   },
//   {path:'**' , component:NotfoundComponent , title:'not found'}
// ];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],
    children: [
      {
        path: 'login',
        title: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },      {
        path: 'forgot',
        title: 'forgotpassword',
        loadComponent: () =>
          import('./shared/components/forgotPassword/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        title: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'cart',
        title: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'products',
        title: 'products',
        loadComponent: () =>
          import('./pages/product/product.component').then(
            (m) => m.ProductComponent
          ),
      },
      {
        path: 'brands',
        title: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      {
        path: 'categories',
        title: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      {
        path: 'checkout/:id',
        title: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },
      {
        path: 'details/:id',
        title: 'details',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'wishlist',
        title: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
    ],
  },

  {
    path: '**',
    title: 'not found',
    loadComponent: () =>
      import('./pages/notfound/notfound.component').then(
        (m) => m.NotfoundComponent
      ),
  },
  
];
