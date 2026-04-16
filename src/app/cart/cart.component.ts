import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../Services/toast.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private toast: ToastService, private products:ProductsSharingServiceService , public router:Router){

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
      console.log(this.cartProducts);
    });

    this.products.cartProductsLength$.subscribe(length =>{
      this.cartCounter = length;
    });
  }

  decreaseQuantity(product : any){
    if(product.quantity === 1){
      this.toast.show('Product removed from cart!' , 'error');
    }
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
    // console.log(this.cartTotalCost);
    return this.cartTotalCost;
  }

 
  
  checkoutNavigate(){
    this.router.navigate(['/checkout']);
    window.scrollTo({top:0 ,behavior:'smooth'});
  }

  productNavigate(id:number){
    this.router.navigate(['/product',id]);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  homeNavigate(){
    this.router.navigate(['/home']);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  
}


