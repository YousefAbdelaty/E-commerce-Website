import { Component, ElementRef, Input, ViewChild, viewChild } from '@angular/core';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: any;
  constructor(private productSharing:ProductsSharingServiceService){}

  @ViewChild('addWishList') addWishList! : ElementRef<HTMLButtonElement>;



  addWishlistHandler(){

    const wishProd = {
      img : this.product.image,
      discount : this.product.discount,
      title : this.product.title,
      price : this.product.price,
      prevPrice : this.product.prevPrice
    }

    const wishBtn = this.addWishList.nativeElement;
    wishBtn.classList.add('fa-beat');
    setTimeout(() => {
      wishBtn.classList.remove('fa-beat');
    }, 2000);


    this.productSharing.setWishProducts(wishProd);
  }

  ngAfterViewInit(){
    this.productSharing.wishProducts$.subscribe(products =>{
      console.log(products);
    })
  }

 
}
