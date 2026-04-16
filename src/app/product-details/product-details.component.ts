import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ToastService } from '../Services/toast.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule , ProductCardComponent],
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
  rating: number = 1;
  starsArray: any[]=[];
  emptyStarsArray: any[] = [];
  ratingsNum: number = 0;
  category:string='';

  constructor(private toast: ToastService ,private prods:ProductsSharingServiceService , private route:ActivatedRoute , private router:Router){}

  ngAfterViewInit(){
   

  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.prods.getById(id).subscribe(product => {
        this.product = product;
        this.ratingsNum = this.product.ratingsQuantity;
        this.description = product.description;
        this.selectedImage = product.moreImages[0];
        this.mainImage = product.mainImage;
        this.category = product.category;
        this.productName = product.title;
        this.rating = Math.round(this.product.rating);
        this.starsArray = Array(this.rating).fill(0);
        this.emptyStarsArray = Array(5 - this.rating).fill(0);
        // this.relatedProducts = this.prods.getAllProductsSnapshot().filter((p:any) => p.id !== id);
        // console.log(this.relatedProducts);
      });

        if (this.prods.getAllProductsSnapshot().length > 0) {
          this.relatedProducts = this.prods.getAllProductsSnapshot().filter(p => p.id !== id);
        } else {
          this.prods.getAllProducts().subscribe(products => {
         this.relatedProducts = products.filter(p => p.id !== id);
        });
  }
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
      this.toast.show('Product removed from wishlist!' , 'error');
    }else if(!this.addedToWishlist){

      this.addedToWishlist=true;

    const wishProd = {
      id: this.product.id,
      mainImg : this.product.mainImage,
      discount : this.product.discount,
      title : this.product.title,
      price : this.product.price,
      prevPrice : this.product.prevPrice,
      moreImages : this.product.moreImages,
      rating:          this.product.rating,  
      ratingsQuantity: this.product.ratingsQuantity
    } 

    this.prods.setWishProducts(wishProd);
    this.toast.show('Product added to wishlist!');
    }
  }

  addCartHandler(){

      const cartProd = {
        img : this.product.mainImage,
        title : this.product.title,
        price : this.product.price,
        id: this.product.id,
      }
      this.prods.setCartProducts(cartProd , this.quantity);
      this.toast.show('Product added to cart!');
      this.router.navigate(['/cart']);
      window.scrollTo({top:0,behavior:'smooth'});
      
  }


 
}
