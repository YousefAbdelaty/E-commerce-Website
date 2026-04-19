import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('thumbnails') thumbnails!:ElementRef;
  product: any = null;         
  productName: any = null;         
  selectedImage: string = '';  
  relatedProducts: any[] = []; 
  quantity: number = 1;
  products :any[]=[];
  moreImgs :any[]=[];
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
  price:any;
 

  constructor(private toast: ToastService ,private prods:ProductsSharingServiceService , private route:ActivatedRoute , private router:Router){}



  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id) {
      
        this.product = null;
        this.selectedImage = '';
        this.mainImage = '';
        this.relatedProducts = [];
        this.starsArray = [];
        this.emptyStarsArray = [];

        this.prods.getById(id).subscribe(product => {
          this.product = product;
          this.ratingsNum = product.ratingsQuantity;
          this.description = product.description;
          this.selectedImage = product.moreImages[0];
          this.mainImage = product.mainImage;
          this.category = product.category;
          this.productName = product.title;
          this.rating = Math.round(product.rating);
          this.starsArray = Array(this.rating).fill(0);
          this.emptyStarsArray = Array(5 - this.rating).fill(0);
          this.moreImgs = product.moreImages;
          setTimeout(() => {
          this.handleScroll();
          });

        });

        if (this.prods.getAllProductsSnapshot().length > 0) {
          this.relatedProducts = this.prods.getAllProductsSnapshot().filter(p => p.id !== id);
        } else {
          this.prods.getAllProducts().subscribe(products => {
            this.relatedProducts = products.filter(p => p.id !== id);
          });
        }


      }
    });
    
  
}



  handleScroll() {
    if (!this.thumbnails) return;

    const el = this.thumbnails.nativeElement;

    if (this.moreImgs.length > 4) {
      if (screen.width > 1200) {
        console.log(this.thumbnails.nativeElement);
        el.style.overflowY = 'scroll';
        el.style.overflowX = 'hidden';
      } else if(screen.width<=1200) {
        el.style.overflowY = 'hidden';
        el.style.overflowX = 'scroll';
      }
    }
  }


ngAfterViewInit():void{
  this.scrollHandler();
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

scrollHandler():any{
    
    const rightScroller = document.getElementById('rightButton') as HTMLButtonElement;
    const leftScroller = document.getElementById('leftButton') as HTMLButtonElement;
    const container = document.getElementById('productsContainer') as HTMLDivElement;
    
    rightScroller.addEventListener("click" , ()=>{
      
      const { scrollLeft, scrollWidth, clientWidth } = container;  
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 200, behavior: 'smooth' });
      }
      
    });
    
    leftScroller.addEventListener("click" , ()=>{
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft <= 5) {
        container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -200, behavior: 'smooth' });
      }
      
      
    });
  }
 
}
