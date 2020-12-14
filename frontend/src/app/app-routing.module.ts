import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './api/services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-acount/create-acount.module').then( m => m.CreateAcountPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'place-order',
    loadChildren: () => import('./place-order/place-order.module').then( m => m.PlaceOrderPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'workforce',
    loadChildren: () => import('./workforce/workforce.module').then( m => m.WorkforcePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'promotions-news',
    loadChildren: () => import('./promotions-news/promotions-news.module').then( m => m.PromotionsNewsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'live-chat',
    loadChildren: () => import('./live-chat/live-chat.module').then( m => m.LiveChatPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'finance',
    loadChildren: () => import('./finance/finance.module').then( m => m.FinancePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then( m => m.BookingsPageModule),
    canActivate: [AuthGuardService]

  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
