import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent,NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordInput! : HTMLInputElement;
  
  togglePassword():any{
    if(this.passwordInput.type==='password'){
      this.passwordInput.type='text';
    }else {
      this.passwordInput.type='password'
    }
    
  }

  

  ngAfterViewInit(): void {
    this.passwordInput=document.getElementById('passwordInput') as HTMLInputElement;
  }
}
