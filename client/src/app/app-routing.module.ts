import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AllMedecinesComponent } from './pages/all-medecines/all-medecines.component';
import { MedicineSingleComponent } from './pages/medicine-single/medicine-single.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserDashboardLayoutComponent } from './layouts/user-dashboard-layout/user-dashboard-layout.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminMedecinesComponent } from './components/admin/admin-medecines/admin-medecines.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'medecines', component: AllMedecinesComponent, pathMatch: 'full' },
      { path: 'medecine/:id', component: MedicineSingleComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'admin',
    component: AdminDashboardLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'medecines', component: AdminMedecinesComponent },
      { path: 'orders', component: AdminOrdersComponent},
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  {
    path: 'user',
    component: UserDashboardLayoutComponent,
    children: [
      { path: '', component: UserDashboardComponent },
      { path: 'orders', component: UserOrdersComponent},
      { path: 'settings', component: SettingsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
