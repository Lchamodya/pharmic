import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from './components/categories/categories.component';
import { AllMedecinesComponent } from './pages/all-medecines/all-medecines.component';
import { MedicineSingleComponent } from './pages/medicine-single/medicine-single.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { EditCategoryComponent } from './components/admin/edit-category/edit-category.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard-layout/admin-dashboard-layout.component';
import { UserDashboardLayoutComponent } from './layouts/user-dashboard-layout/user-dashboard-layout.component';
import { AdminCategoriesComponent } from './components/admin/admin-categories/admin-categories.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminMedecinesComponent } from './components/admin/admin-medecines/admin-medecines.component';
import { AddMedecineComponent } from './components/admin/add-medecine/add-medecine.component';
import { EditMedecineComponent } from './components/admin/edit-medecine/edit-medecine.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { ViewOrdersComponent } from './components/view-orders/view-orders.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    HomeComponent,
    ServicesComponent,
    ContactComponent,
    ProductsComponent,
    CategoriesComponent,
    AllMedecinesComponent,
    MedicineSingleComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminUsersComponent,
    SettingsComponent,
    AddCategoryComponent,
    AddUserComponent,
    EditCategoryComponent,
    EditUserComponent,
    AdminDashboardLayoutComponent,
    UserDashboardLayoutComponent,
    AdminCategoriesComponent,
    AdminMedecinesComponent,
    AddMedecineComponent,
    EditMedecineComponent,
    AdminOrdersComponent,
    ViewOrdersComponent,
    UserOrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
