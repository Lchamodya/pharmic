import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
})
export class ServicesComponent {
  
  services: Service[] = [
    {
      title: "You shop We Deliver",
      imageSrc: "assets/images/services/delivery.jpg",
      description: "We are committed to providing top-quality pharmaceutical care and a wide range of health and wellness products to our valued customers."
    },
    {
      title: "Health Indicator",
      imageSrc: "assets/images/services/instructions.jpg",
      description: "We are committed to providing top-quality pharmaceutical care and a wide range of health and wellness products to our valued customers."
    },
    {
      title: "Compounding Service",
      imageSrc: "assets/images/services/compound.jpg",
      description: "We are committed to providing top-quality pharmaceutical care and a wide range of health and wellness products to our valued customers."
    }
  ];
}

interface Service {
  title: string;
  imageSrc: string;
  description: string;
}