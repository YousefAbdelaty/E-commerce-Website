import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FooterComponent , NavbarComponent , FooterComponent , CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  constructor( private products : ProductsSharingServiceService){}
  cartProducts! : any[];
  cartTotalCost! : number;
  ngOnInit(){
    this.products.cartProducts$.subscribe(products =>{
      this.cartProducts = products;
    })

    // console.log(this.products.getCartTotal());
    this.cartTotalCost = this.products.getCartTotal();
    console.log(this.cartTotalCost);
  }
}
