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
  id:number=0;
  redColorActive:boolean=false;
  BlueColorActive:boolean=false;

  constructor(private prods:ProductsSharingServiceService , private route:ActivatedRoute){
    this.products = this.prods.getAllProducts();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.mainImage=this.products[this.id].mainImage;
  }

  
  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
    if (this.product) {
      this.selectedImage = this.product.moreImages[0];
      this.relatedProducts = this.products.filter(p => p.id !== id);
      this.productName = this.product.title;
      console.log(this.selectedImage);
    }
    console.log(this.product);
    
  }
  
  selectImage(img: string) {
    this.selectedImage = img;
    this.mainImage=img;
  }

  increment() { this.quantity++; }
  decrement() { if (this.quantity > 1) this.quantity--; }

  blueColorActive(){
    this.redColorActive = false;
    this.BlueColorActive = true;
  }
  
  redColorActivation(){
    this.redColorActive = true;
    this.BlueColorActive = false;
  }
 
}
