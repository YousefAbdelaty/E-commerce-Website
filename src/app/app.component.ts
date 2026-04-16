import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FooterComponent } from "./footer/footer.component";
import { NgClass } from '@angular/common';
import { ToastService } from './Services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass ,RouterOutlet, LoginComponent, SignUpComponent, NavbarComponent, HomePageComponent, ProductCardComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-commerce';
  constructor(public toastService: ToastService){}
}
