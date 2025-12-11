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
      this.loadUserCart();
    }
  }
  setUserId(userId: string) {
    this.userId = userId;
    localStorage.setItem('userId', userId);
    this.loadUserWishlist();  
    this.loadUserCart();
  }

  private loadUserWishlist() {
    const products = JSON.parse(localStorage.getItem(`wishProducts_${this.userId}`) || '[]');
    this.wishProducts.next(products);
  }

  private loadUserCart() {
    const products = JSON.parse(localStorage.getItem(`cartProducts_${this.userId}`) || '[]');
    this.cartProducts.next(products);
  }



  private wishProducts = new BehaviorSubject<any[]>([]);
  wishProducts$ = this.wishProducts.asObservable();
  
  private cartProducts = new BehaviorSubject<any[]>([]);
  cartProducts$ = this.wishProducts.asObservable();
  
  wishProductsLength$ = this.wishProducts$.pipe(
    map(products => products.length)
  );
  
  cartProductsLength$ = this.cartProducts$.pipe(
    map(products => products.length)
  );

  removeWishProduct(product : any){
   let currentWishProducts = this.wishProducts.getValue();
   currentWishProducts = currentWishProducts.filter(prod =>{
    return prod.title !== product.title || prod.price !== product.price ;
   })
   this.wishProducts.next(currentWishProducts);
   if (this.userId) {
    localStorage.setItem(`wishProducts_${this.userId}`, JSON.stringify(currentWishProducts));
   }
  }


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

  setCartProducts(product : any){
    const currentCartProducts = this.cartProducts.getValue();

    if(!currentCartProducts.find(p => p.title === product.title && p.price === product.price)){
      
      currentCartProducts.push(product);
      this.cartProducts.next(currentCartProducts);
      
      if (this.userId) {
        localStorage.setItem(`cartProducts_${this.userId}`, JSON.stringify(currentCartProducts));
        
      }
    }
    
  }

  getWishProducts (){
    return this.wishProducts.getValue();
  }
  getCartProducts (){
    return this.cartProducts.getValue();
  }

  // get wishListLength() {
  //   return this.wishProducts.getValue().length;
  // }



}
