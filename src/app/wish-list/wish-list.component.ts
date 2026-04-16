import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from '../Services/toast.service';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [ProductCardComponent ,NavbarComponent, FooterComponent , CommonModule],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  constructor(private prods : ProductsSharingServiceService ,private toast: ToastService, private productsSharing:ProductsSharingServiceService , public router:Router){}
  wishCounter! : Number;
  wishListProducts! : any[];
  rating: number = 1;
  starsArray: any[]=[];
  emptyStarsArray: any[] = [];
  ratingsQuantity: any;

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
    this.toast.show('Product removed from wishlist!' , 'error');
  }
  
  productNavigate(id:number){
    this.router.navigate(['/product',id]);
    window.scrollTo({top:0,behavior:'smooth'});
  }

  addCartHandler(product : any){

      const cartProd = {
        img : product.mainImg,
        title : product.title,
        price : product.price,
        id: product.id,
      }
      this.prods.setCartProducts(cartProd);
      this.toast.show('Product added to cart!');
      
  }
  getFilledStars(product: any): any[] {
    const rating = Math.round(product.rating) || 0;
    return Array(rating).fill(0);
  }

  getEmptyStars(product: any): any[] {
    const rating = Math.round(product.rating) || 0;
    return Array(5 - rating).fill(0);
  } 

  // ngAfterViewInit(){
  //  this.rating = Math.round(this.product.rating);
  //  this.ratingsQuantity = this.product.ratingsQuantity;
  //  this.starsArray = Array(this.rating).fill(0);
  //  this.emptyStarsArray = Array(5 - this.rating).fill(0);
  // }

} 
