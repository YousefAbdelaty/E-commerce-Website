import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthServiceService } from '../Services/auth.service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent , FooterComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor( private authService: AuthServiceService) {}
  username: string = '';

  ngOnInit() {
     this.authService.username$.subscribe(name =>{
      this.username = name;
     });
     console.log(this.username);
  }


}


