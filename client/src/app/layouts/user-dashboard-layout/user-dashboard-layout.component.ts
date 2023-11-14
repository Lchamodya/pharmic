import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-layout',
  templateUrl: './user-dashboard-layout.component.html',
})
export class UserDashboardLayoutComponent {
  sidebarData: SidebarData = {
    navigationLinks: [
      { label: 'Dashboard', link: '/user' },
      { label: 'Orders', link: '/user/orders' },
      { label: 'Settings', link: '/user/settings' },
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
