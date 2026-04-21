import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(public prods:ProductsSharingServiceService) { }
  products:any[]=[];
  priceRange:string="";


  ngOnInit(){
    this.prods.getAllProducts().subscribe((prods)=>{
      this.products=prods;
    });
    console.log(this.products);
  }

  priceRangeChange(selectedRange: string) {
    this.priceRange = selectedRange;
  }

}
