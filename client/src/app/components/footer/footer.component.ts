import { Component} from '@angular/core';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent{

  navigationLinks = [
    { label: 'Home', link: '#' },
    { label: 'Products', link: '#' },
    { label: 'About', link: '#' },
    { label: 'Contact', link: '#' },
  ];

  facebookIcon = faFacebook;
  twittwerIcon = faTwitter;
  instagramIcon = faInstagram;
}
