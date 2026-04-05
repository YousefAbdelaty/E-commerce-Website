import { Component } from '@angular/core';
import { HomePageComponent } from '../home-page/home-page.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
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
  constructor(private prods:ProductsSharingServiceService , private route:ActivatedRoute){
    this.products = this.prods.getAllProducts();
  }
  
  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);
    if (this.product) {
      this.selectedImage = this.product.moreImages[0];
      this.relatedProducts = this.products.filter(p => p.id !== id);
      this.productName = this.product.title;
    }


  }

   selectImage(img: string) {
    this.selectedImage = img;
  }

  increment() { this.quantity++; }
  decrement() { if (this.quantity > 1) this.quantity--; }

 
}
