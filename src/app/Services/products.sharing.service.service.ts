import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSharingServiceService {

  private userId: string | null = null;
  
  
  constructor() { 
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.loadUserWishlist();
    }
  }
  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
    this.loadUserWishlist();  
  }

  private loadUserWishlist() {
    const products = JSON.parse(localStorage.getItem(`wishProducts_${this.userId}`) || '[]');
    this.wishProducts.next(products);
  }



  private wishProducts = new BehaviorSubject<any[]>([]);
  wishProducts$ = this.wishProducts.asObservable();

  wishProductsLength$ = this.wishProducts$.pipe(
    map(products => products.length)
  );


  setWishProducts(product : any){
    const currentWishProducts = this.wishProducts.getValue();
    
    if(!currentWishProducts.find(p => p.title === product.title && p.price === product.price)){
      
      currentWishProducts.push(product);
      this.wishProducts.next(currentWishProducts);

       if (this.userId) {
        localStorage.setItem(`wishProducts_${this.userId}`, JSON.stringify(currentWishProducts));
  
      }
    }
  }

  getWishProducts (){
    return this.wishProducts.getValue();
  }

  get wishListLength() {
    return this.wishProducts.getValue().length;
  }



}
