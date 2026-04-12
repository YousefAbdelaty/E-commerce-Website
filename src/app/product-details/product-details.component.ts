import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  product: any = null;         
  productName: any = null;         
  selectedImage: string = '';  
  relatedProducts: any[] = []; 
  quantity: number = 1;
  products :any[]=[];
  mainImage:string='';
  description:string='';
  id:number=0;
  colorActvie:string='';
  sizeActive:string='';
  addedToWishlist:boolean=false;

  constructor(private prods:ProductsSharingServiceService , private route:ActivatedRoute){}

  
  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.prods.getById(id).subscribe(product => {
        this.product = product;
        this.description = product.description;
        this.selectedImage = product.moreImages[0];
        this.mainImage = product.mainImage;
        this.productName = product.title;
        this.relatedProducts = this.prods.getAllProductsSnapshot().filter((p:any) => p.id !== id);
      });
    }
    
  }
  
  selectImage(img: string) {
    this.selectedImage = img;
    this.mainImage=img;
  }

  increment() { this.quantity++; }
  decrement() { if (this.quantity > 1) this.quantity--; }

  selectColor(color: string) {
    this.colorActvie = color;
  }

  selectSize(size: string) {
    this.sizeActive = size;
  }

  addToWishlist(){
   
    if(this.addedToWishlist){

      this.addedToWishlist=false;
      this.prods.removeWishProduct(this.product); 

    }else if(!this.addedToWishlist){

      this.addedToWishlist=true;

      const wishProd = {
      id: this.product.id,
      mainImg : this.product.mainImage,
      discount : this.product.discount,
      title : this.product.title,
      price : this.product.price,
      prevPrice : this.product.prevPrice,
      moreImages : this.product.moreImages
      } 

    this.prods.setWishProducts(wishProd);
    }
  }

  addCartHandler(){
    const cartProd = {
      img : this.product.mainImage,
      title : this.product.title,
      price : this.product.price,
      id: this.product.id,
    }
    this.prods.setCartProducts(cartProd);
  }


 
}
