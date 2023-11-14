import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  mainTitle: string = "Your";
  highlightedText: string = "Pharmacy";
  subTitle: string = "Store";
  description: string = "Welcome to Phararmic, your trusted partner in health and wellness. At Pharmic, we are committed to providing top-quality pharmaceutical care and a wide range of health and wellness products to our valued customers.";
  buttonText: string = "Learn More";
  imagePath: string = "assets/images/hero-image.jpg";
}
