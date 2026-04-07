import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [NavbarComponent, FooterComponent , CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  constructor(private productsSharing:ProductsSharingServiceService , public router:Router){}
  
  wishCounter! : Number;
  wishListProducts! : any[];

  ngOnInit(){
    this.productsSharing.wishProductsLength$.subscribe(length =>{
      this.wishCounter = length;
    });

    this.productsSharing.wishProducts$.subscribe(products =>{
      this.wishListProducts=products;
    });
    
    console.log(this.wishListProducts);
  }

  removeProduct(product : any){
    this.productsSharing.removeWishProduct(product);
  }
  
  productNavigate(id:number){
    this.router.navigate(['/product',id]);
    window.scrollTo({top:0,behavior:'smooth'});
  }

} 
