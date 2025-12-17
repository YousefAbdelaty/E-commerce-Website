import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private products:ProductsSharingServiceService){}

  cartCounter! : Number;
  prodQuantity! : HTMLParagraphElement;
  cartProducts! : any[];

  ngAfterViewInit(){

    this.prodQuantity = document.getElementById ('prodQuantity') as HTMLParagraphElement;
  }
  ngOnInit(){
    this.products.cartProducts$.subscribe(prods =>{
      this.cartProducts = prods;
    });

    this.products.cartProductsLength$.subscribe(length =>{
      this.cartCounter = length;
    });
  }

  decreaseQuantity(product : any){
    this.products.decreaseQuantity(product);
    //  if(product.quantity<=9){
    //   this.prodQuantity.innerHTML=`0${product.quantity}`;
    // }
  }
  increaseQuantity(product : any){
    this.products.increaseQuantity(product);
    // if(product.quantity>=10){

    //   this.prodQuantity.innerHTML=`${product.quantity}`;
    // }
  }

  subtotalCalc(quantity : any , price:any){
    return quantity * price ;
  }


}
