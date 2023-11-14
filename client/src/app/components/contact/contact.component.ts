import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  imagePath: string = 'assets/images/contact.jpg';

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Submitted Form Data:', formData);

      this.contactForm.reset();
    }
  }
}
