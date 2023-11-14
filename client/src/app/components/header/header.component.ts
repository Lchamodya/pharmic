import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { faShoppingCart, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  searchForm!: FormGroup;
  user: any; // variable to store user data
  userDataLoaded: boolean = false; // flag to track if user data has been loaded

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchValue: ['', Validators.required],
    });

    // Initialize user data
    this.authService.initUserData().subscribe(
      (userData) => {
        this.user = userData;
        this.userDataLoaded = true; // Set flag to true when data is loaded
      },
      (error) => {
        // Handle error if needed
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const searchValue = this.searchForm.value.searchValue;
      this.router.navigate(['/medicines'], { queryParams: { search: searchValue } });
    }
  }

  isLoggedIn(): boolean {
    return this.authService.getUser() !== null;
  }

  logout() {
    localStorage.removeItem('token');
    this.user = null;
    this.userDataLoaded = false; 
    window.location.href = '/';
  }
  

  navigationLinks = [
    { label: 'Home', link: '#' },
    { label: 'Medecines', link: '/medecines' },
    { label: 'About', link: '#services' },
    { label: 'Contact', link: '#contact' },
  ];

  cartIcon = faShoppingCart;
  userIcon = faUser;
  searchIcon = faSearch;
}
