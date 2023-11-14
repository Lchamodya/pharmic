import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, merge, of } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CloudinaryService } from './cloudinary.service';
import { Medicine } from '../models/medecine-model';
import { CategoryService } from './category.service';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private socket: any;
  private apiUrl = 'http://localhost:12000/api/medicine';

  constructor(private http: HttpClient, private cloudinaryService: CloudinaryService, private categoryService: CategoryService) {
    // this.socket = io('http://localhost:25000', { transports: ['websocket'] })
  }
  
  addMedicine(medicineData: FormData): Observable<Medicine> {
    if (medicineData.has('image')) {
      return this.cloudinaryService.uploadImage(medicineData.get('image') as File).pipe(
        switchMap((imageUrl: string) => {
          medicineData.delete('image');
  
          const updatedMedicineData = {
            ...this.convertFormDataToJson(medicineData),
            imageUrl: imageUrl,
          };
  
          console.log(updatedMedicineData);
          return this.http.post<Medicine>(this.apiUrl, updatedMedicineData);
        })
      );
    } else {
      const medicineJsonData = this.convertFormDataToJson(medicineData);
      console.log(medicineJsonData);
      return this.http.post<Medicine>(this.apiUrl, medicineJsonData);
    }
  }
  
  private convertFormDataToJson(formData: FormData): { [key: string]: string } {
    const jsonData: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      jsonData[key] = value as string;
    });
    return jsonData;
  }
  
  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.apiUrl);
  }


  getMedicineById(medicineId: string): Observable<Medicine> {
    const url = `${this.apiUrl}/${medicineId}`;
    return this.http.get<Medicine>(url);
  }

  updateMedicine(medicineId: string, medicineData: Medicine, image: File | null): Observable<Medicine> {
    let requestData: any;
  
    if (image) {
      return this.cloudinaryService.uploadImage(image).pipe(
        switchMap((uploadedImageURL) => {
          const medicineWithImageUrl: Medicine = { ...medicineData, imageUrl: uploadedImageURL };
          requestData = this.convertMedicineToJSON(medicineWithImageUrl);
          const url = `${this.apiUrl}/${medicineId}`;
          return this.http.put<Medicine>(url, requestData);
        })
      );
    } else {
      requestData = this.convertMedicineToJSON(medicineData);
      const url = `${this.apiUrl}/${medicineId}`;
      return this.http.put<Medicine>(url, requestData);
    }
  }
  
  private convertMedicineToJSON(medicine: Medicine): any {
    return JSON.parse(JSON.stringify(medicine));
  }
  

  deleteMedicine(medicineId: string): Observable<void> {
    const url = `${this.apiUrl}/${medicineId}`;
    return this.http.delete<void>(url);
  }

  getAllMedicinesWithCategories(): Observable<Medicine[]> {
    return this.getAllMedicines().pipe(
      switchMap((medicines) => {
        const observables = medicines.map((medicine) =>
          this.categoryService.getCategoryById(medicine.category)
        );

        return forkJoin(observables).pipe(
          map((categories) => {
            return medicines.map((medicine, index) => ({
              ...medicine,
              category: categories[index].name,
            }));
          })
        );
      })
    );
  }

  // getAllMedicinesWithCategories(): Observable<Medicine[]> {
  //   const httpObservable = this.http.get<Medicine[]>(this.apiUrl);

  //   const socketObservable = new Observable<Medicine[]>((observer) => {
  //     this.socket.on('medicineDetails', (medicines: any) => {
  //       observer.next(medicines);
  //     });
  //   });

  //   return httpObservable.pipe(
  //     switchMap((medicines) =>
  //       socketObservable.pipe(
  //         mergeMap((socketUpdates) => this.handleSocketUpdates(medicines, socketUpdates))
  //       )
  //     )
  //   );
  // }

  private handleSocketUpdates(existingMedicines: Medicine[], socketUpdates: Medicine[]): Observable<Medicine[]> {
    const updatedMedicines = existingMedicines.map((existingMedicine) => {
      const socketUpdate = socketUpdates.find((update) => update._id === existingMedicine._id);

      if (socketUpdate) {
        return {
          ...existingMedicine,
          // Merge other properties as needed
        };
      } else {
        return existingMedicine;
      }
    });

    // Add new medicines from socket updates
    const newMedicines = socketUpdates.filter((socketUpdate) => !existingMedicines.some((existing) => existing._id === socketUpdate._id));
    const result = [...updatedMedicines, ...newMedicines];

    return of(result);
  }

  // getMedicineByIdWithCategory(medicineId: string): Observable<Medicine> {
  //   const medicineUrl = `${this.apiUrl}/${medicineId}`;

  //   const httpObservable = this.http.get<Medicine>(medicineUrl);

  //   const socketObservable = new Observable<Medicine>((observer) => {
  //     this.socket.on('medicineDetails', (medicines: any) => {
  //       const updatedMedicine = medicines.find((m: Medicine) => m._id === medicineId);
  //       if (updatedMedicine) {
  //         observer.next(updatedMedicine);
  //       }
  //     });
  //   });

  //   return merge(httpObservable, socketObservable).pipe(
  //     switchMap((medicine) =>
  //       forkJoin({
  //         medicine: of(medicine),
  //         category: this.categoryService.getCategoryById(medicine.category),
  //       })
  //     ),
  //     map((data) => {
  //       const medicineWithCategoryName: Medicine = {
  //         ...data.medicine,
  //         category: data.category.name,
  //       };
  //       return medicineWithCategoryName;
  //     })
  //   );
  // }
  getMedicineByIdWithCategory(medicineId: string): Observable<Medicine> {
    const medicineUrl = `${this.apiUrl}/${medicineId}`;
  
    return this.http.get<Medicine>(medicineUrl).pipe(
      switchMap((medicine) =>
        forkJoin({
          medicine: of(medicine),
          category: this.categoryService.getCategoryById(medicine.category),
        })
      ),
      map((data) => {
        const medicineWithCategoryName: Medicine = {
          ...data.medicine,
          category: data.category.name,
        };
        return medicineWithCategoryName;
      })
    );
  }
}
