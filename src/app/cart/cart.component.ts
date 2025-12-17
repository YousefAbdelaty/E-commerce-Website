import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent , FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private products:ProductsSharingServiceService){}

  cartCounter! : Number;
  cartProducts! : any[];

  ngOnInit(){
    this.products.cartProducts$.subscribe(prods =>{
      this.cartProducts = prods;
    });

    this.products.cartProductsLength$.subscribe(length =>{
      this.cartCounter = length;
    });
  }

}
