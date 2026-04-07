import { Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { HomePageComponent } from '../home-page/home-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

  @Input() product: any;
  constructor(private productSharing:ProductsSharingServiceService , public router:Router){}

  @ViewChild('addWishList') addWishList! : ElementRef<HTMLButtonElement>;

  productNavigate(id:number){
    this.router.navigate(['/product',id]);
    window.scrollTo({top:0,behavior:'smooth'});
  }


  addWishlistHandler(){

    const wishProd = {
      id: this.product.id,
      mainImg : this.product.mainImage,
      discount : this.product.discount,
      title : this.product.title,
      price : this.product.price,
      prevPrice : this.product.prevPrice,
      moreImages : this.product.moreImages
    }

    const wishBtn = this.addWishList.nativeElement;
    wishBtn.classList.add('fa-beat');
    setTimeout(() => {
      wishBtn.classList.remove('fa-beat');
    }, 2000);


    this.productSharing.setWishProducts(wishProd);
  }

  addCartHandler(){
    const cartProd = {
      img : this.product.mainImage,
      title : this.product.title,
      price : this.product.price,
      id: this.product.id,
    }
    this.productSharing.setCartProducts(cartProd);
  }

  ngAfterViewInit(){
    // this.productSharing.wishProducts$.subscribe(products =>{
    //   console.log(products);
    // });
    this.productSharing.cartCounter.subscribe(length =>{
      console.log(length);
    })
    this.productSharing.cartProducts$.subscribe(prods =>{
      console.log(prods);
    })
   console.log(this.productSharing.getCartProducts());
  }

 
}
