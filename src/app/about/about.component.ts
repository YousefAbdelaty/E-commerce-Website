import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NavbarComponent , FooterComponent , NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  slide1 = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', photo: '/assets/images/About/1.jpg', twitter: '#', instagram: '#', linkedin: '#' },
    { name: 'Emma Watson', role: 'Managing Director', photo: '/assets/images/About/2.jpg', twitter: '#', instagram: '#', linkedin: '#' },
    { name: 'Will Smith',  role: 'Product Designer',  photo: '/assets/images/About/3.jpg', twitter: '#', instagram: '#', linkedin: '#' },
  ];
  slide2 = [
    { name: 'Tom Cruise', role: 'Founder & Chairman', photo: '/assets/images/About/2.jpg', twitter: '#', instagram: '#', linkedin: '#' },
    { name: 'Emma Watson', role: 'Managing Director', photo: '/assets/images/About/3.jpg', twitter: '#', instagram: '#', linkedin: '#' },
    { name: 'Will Smith',  role: 'Product Designer',  photo: '/assets/images/About/1.jpg', twitter: '#', instagram: '#', linkedin: '#' },
  ];

}
