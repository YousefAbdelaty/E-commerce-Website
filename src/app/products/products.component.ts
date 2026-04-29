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
  categories: string[] = [];
  selectedRating: number = 0;

  minPrice: number = 0;
  maxPrice: number = 0;       // set dynamically after products load
  priceRangeMax: number = 0;  // the ceiling for the slider — also dynamic

  minPercent: number = 0;
  maxPercent: number = 100;

  ngOnInit() {
    this.prods.getAllProducts().subscribe(prods => {
      this.products = [...prods];
      this.filterdProducts = [...prods];

      
      this.categories = [...new Set(prods.map((p: any) => p.category as string))]
        .filter(c => !!c)
        .sort();

     
      const prices = prods.map((p: any) => p.price);
      this.minPrice = 0;
      this.priceRangeMax = Math.ceil(Math.max(...prices) / 100) * 100; // round up to nearest 100
      this.maxPrice = this.priceRangeMax;
      this.updateSlider();
    });
  }

  ngAfterViewInit() {
    this.updateSlider();
  }

  onMinChange() {
    if (this.minPrice < 0) this.minPrice = 0;
    if (this.minPrice > this.maxPrice - 10) this.minPrice = this.maxPrice - 10;
    this.updateSlider();
    this.applyFilters();
  }

  onMaxChange() {
    if (this.maxPrice > this.priceRangeMax) this.maxPrice = this.priceRangeMax;
    if (this.maxPrice < this.minPrice + 10) this.maxPrice = this.minPrice + 10;
    this.updateSlider();
    this.applyFilters();
  }

  onCategoryChange(category: string, event: any) {
    if (event.target.checked) {
      this.selectedCategories = [...this.selectedCategories, category];
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
    if (this.priceRangeMax === 0) return;
    this.minPercent = (this.minPrice / this.priceRangeMax) * 100;
    this.maxPercent = (this.maxPrice / this.priceRangeMax) * 100;
  }

  applyFilters() {
    this.filterdProducts = this.products.filter(product => {

      const matchesPrice =
        product.price >= this.minPrice &&
        product.price <= this.maxPrice;

      const matchesCategory =
        this.selectedCategories.length === 0 ||
        this.selectedCategories.includes(product.category);

      const matchesRating =
        this.selectedRating === 0 ||
        product.rating >= this.selectedRating;

      return matchesPrice && matchesCategory && matchesRating;
    });
  }

  clearFilters() {
    this.minPrice = 0;
    this.maxPrice = this.priceRangeMax; 
    this.selectedRating = 0;
    this.selectedCategories = [];
    this.updateSlider();
    this.filterdProducts = [...this.products];
  }
}