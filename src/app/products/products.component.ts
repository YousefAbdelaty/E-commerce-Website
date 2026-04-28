import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCardComponent, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(public prods: ProductsSharingServiceService) {}

  products: any[] = [];
  filterdProducts: any[] = [];
  selectedCategories: string[] = [];
  categories = ["Women's Fashion", "Men's Fashion", "Electronics"];
  selectedRating: number = 0;
  minPrice: number = 0;
  maxPrice: number = 1000;
  minPercent: number = 0;
  maxPercent: number = 100;

  ngOnInit() {
    this.prods.getAllProducts().subscribe(prods => {
      this.products = prods;
      this.filterdProducts = prods;
      console.log('sample category:', prods[0]?.category); // add this
      console.log('all categories:', [...new Set(prods.map((p:any) => p.category))]); // add this
    });
  }

  ngAfterViewInit() {
    this.updateSlider();
  }

  onMinChange() {
    if (this.minPrice > this.maxPrice - 10) this.minPrice = this.maxPrice - 10;
    this.updateSlider();
    this.applyFilters();
  }

  onMaxChange() {
    if (this.maxPrice < this.minPrice + 10) this.maxPrice = this.minPrice + 10;
    this.updateSlider();
    this.applyFilters();
  }

  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    }
    this.applyFilters();
  }

  onRatingChange(rating: number) {
    this.selectedRating = rating;
    this.applyFilters();
  }

  getCategoryId(category: string) {
    return category.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  updateSlider() {
    this.minPercent = (this.minPrice / 1000) * 100;
    this.maxPercent = (this.maxPrice / 1000) * 100;
  }

  private getCategoryName(product: any): string {
    if (!product.category) return '';
    if (typeof product.category === 'string') return product.category;
    return product.category.name ?? '';  
  }

  applyFilters() {
    this.filterdProducts = this.products.filter(product => {

      const matchesPrice =
        product.price >= this.minPrice &&
        product.price <= this.maxPrice;

      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.some(c =>
          product.category?.toLowerCase().trim() === c.toLowerCase().trim()
        );

      const matchesRating =
        this.selectedRating === 0 ||
        product.rating >= this.selectedRating;

      return matchesPrice && matchesCategory && matchesRating;
    });
  }
}