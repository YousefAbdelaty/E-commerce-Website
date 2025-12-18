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

  constructor(private products:ProductsSharingServiceService){

  }

  cartTotalCost! : number;
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
  }
  
  increaseQuantity(product : any){
    this.products.increaseQuantity(product);
  }

  subtotalCalc(quantity : any , price:any){
    return quantity * price ;
  }

  cartTotal(products : any){
    this.cartTotalCost = products.reduce((total : any , product : any) =>{
      return total + (product.price * product.quantity)
    },0);
    this.products.setCartTotal(this.cartTotalCost);
    return this.cartTotalCost;
  }

  
}


