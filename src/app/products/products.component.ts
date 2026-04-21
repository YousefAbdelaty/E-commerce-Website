import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(public prods:ProductsSharingServiceService) { }
  products:any[]=[];
  minPrice: number = 0;
  maxPrice: number = 800;
  minPercent: number = 0;
  maxPercent: number = 100;




  ngOnInit(){
    this.prods.getAllProducts().subscribe((prods)=>{
      this.products=prods;
    });
    console.log(this.products);
  }

  ngAfterViewInit() {
    this.updateSlider();
  }

  onMinChange() {
    if (this.minPrice > this.maxPrice - 10) {
      this.minPrice = this.maxPrice - 10;
    }
    this.updateSlider();
  }

  onMaxChange() {
    if (this.maxPrice < this.minPrice + 10) {
      this.maxPrice = this.minPrice + 10;
    }
    this.updateSlider();
  }

  updateSlider() {
    const min = 0;
    const max = 1000;

    this.minPercent = ((this.minPrice - min) / (max - min)) * 100;
    this.maxPercent = ((this.maxPrice - min) / (max - min)) * 100;
  }



}
