// all-medecines.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Medicine } from 'src/app/models/medecine-model';
import { MedicineService } from 'src/app/services/medecine.service';

@Component({
  selector: 'app-all-medecines',
  templateUrl: './all-medecines.component.html',
})
export class AllMedecinesComponent implements OnInit {
  cartIcon = faShoppingCart;

  medecines: Medicine[] = [];
  filteredMedecines: Medicine[] = this.medecines;
  categories: string[] = [];
  private searchTerm$ = new Subject<string>();
  private categoryFilter$ = new Subject<string>();
  searchTerm: string = '';
  selectedCategory: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicineService: MedicineService
  ) {}

  ngOnInit(): void {
    this.medicineService.getAllMedicinesWithCategories().subscribe(
      (medicines) => {
        this.medecines = medicines;
        this.categories = this.getUniqueCategories();
        this.filterByCategoryAndSearch();
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );

    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterByCategoryAndSearch();
        this.updateQueryParams();
      });

    this.categoryFilter$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.filterByCategoryAndSearch();
        this.updateQueryParams();
      });

    const routeParams = this.route.snapshot.queryParamMap;
    this.selectedCategory = routeParams.get('category') || '';
    this.searchTerm = routeParams.get('search') || '';
  }

  onSearchTermChange(term: string) {
    this.searchTerm = term;
    this.searchTerm$.next(term);
  }

  onCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.categoryFilter$.next(this.selectedCategory);
  }

  updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm,
        category: this.selectedCategory,
      },
      queryParamsHandling: 'merge',
    });
  }

  filterByCategoryAndSearch() {
    this.filteredMedecines = this.medecines.filter((medecine) => {
      const categoryFilter =
        !this.selectedCategory || medecine.category === this.selectedCategory;
      const textSearch =
        !this.searchTerm || medecine.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return categoryFilter && textSearch;
    });
  }

  getUniqueCategories(): string[] {
    return Array.from(new Set(this.medecines.map((medecine) => medecine.category)));
  }
}
