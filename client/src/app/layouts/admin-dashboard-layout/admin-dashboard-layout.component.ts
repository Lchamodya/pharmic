import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-layout',
  templateUrl: './admin-dashboard-layout.component.html',
})

export class AdminDashboardLayoutComponent {
  sidebarData: SidebarData = {
    navigationLinks: [
      { label: 'Dashboard', link: '/admin' },
      { label: 'Categories', link: '/admin/categories' },
      { label: 'Medecines', link: '/admin/medecines' },
      { label: 'orders', link: '/admin/orders' },
      { label: 'Users', link: '/admin/users' },
      { label: 'Settings', link: '/admin/settings' },
    ],
    userProfile: {
      avatar: 'user-avatar.jpg',
      username: 'Admin User'
    }
  };
}

interface NavigationLink {
  label: string;
  link: string;
}

interface UserProfile {
  avatar: string;
  username: string;
}

interface SidebarData {
  navigationLinks: NavigationLink[];
  userProfile: UserProfile;
}
