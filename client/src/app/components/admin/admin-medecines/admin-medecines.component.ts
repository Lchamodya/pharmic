import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddMedecineComponent } from '../add-medecine/add-medecine.component';
import { EditMedecineComponent } from '../edit-medecine/edit-medecine.component';
import { MedicineService } from 'src/app/services/medecine.service';
import { CategoryService } from 'src/app/services/category.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-medecines',
  templateUrl: './admin-medecines.component.html',
})
export class AdminMedecinesComponent implements OnInit {
  medecines: any[] = [];

  constructor(public dialog: MatDialog, private medicineService: MedicineService,private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.getMedecines();
  }

  openEditMedecineModal(medecine: any): void {
    const dialogRef = this.dialog.open(EditMedecineComponent, {
      data: { medicineData: medecine },
    });
  }

  getMedecines(): void {
    this.medicineService.getAllMedicines().subscribe(
      (medicines) => {
        const observables = medicines.map((medicine) =>
          this.categoryService.getCategoryById(medicine.category)
        );
  
        forkJoin(observables).subscribe(
          (categories) => {
            this.medecines = medicines.map((medicine, index) => ({
              ...medicine,
              category: categories[index].name, // Assuming 'name' is the property you want to use
            }));
            console.log(this.medecines);
          },
          (categoriesError) => {
            console.error('Error fetching categories:', categoriesError);
          }
        );
      },
      (error) => {
        console.error('Error fetching medicines:', error);
      }
    );
  }

  deleteConfirmation(medecineId: string, medecineName: string): void {
    const confirmation = window.confirm(`Are you sure you want to delete the medicine: ${medecineName}?`);
  
    if (confirmation) {
      this.medicineService.deleteMedicine(medecineId);
    }
  }

  openAddMedecineModal(): void {
    const dialogRef = this.dialog.open(AddMedecineComponent);
  }
}

