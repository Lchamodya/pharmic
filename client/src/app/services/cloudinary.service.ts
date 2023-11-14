// cloudinary.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cloudName = 'df1q0sq1j';
  private apiKey = '783512814874779';

  uploadImage(selectedImageFile: File): Observable<string> {
    const imageData = new FormData();
    imageData.append('file', selectedImageFile);
    imageData.append('api_key', this.apiKey);
    imageData.append('upload_preset', 'uwc2buej');

    return new Observable<string>((observer) => {
      fetch(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, {
        method: 'POST',
        body: imageData,
      })
        .then((response) => {
          if (response.status !== 200) {
            observer.error('Error uploading image to Cloudinary');
            return;
          }
          return response.json();
        })
        .then((data) => {
          const uploadedImageURL = `https://res.cloudinary.com/${this.cloudName}/image/upload/${data.public_id}.${data.format}`;
          observer.next(uploadedImageURL);
          observer.complete();
        })
        .catch((error) => {
          observer.error('Error uploading image to Cloudinary');
        });
    });
  }
}
