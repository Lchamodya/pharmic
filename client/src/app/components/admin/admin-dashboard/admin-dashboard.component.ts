import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  links = [
    { label: 'Dashboard', url: '/admin' },
    { label: 'Categories', url: '/admin/categories' },
    { label: 'Medecines', url: '/admin/medecines' },
    { label: 'Orders', url: '/admin/orders' },
    { label: 'Users', url: '/admin/users' },
    { label: 'Settings', url: '/admin/settings' },
  ]
}
