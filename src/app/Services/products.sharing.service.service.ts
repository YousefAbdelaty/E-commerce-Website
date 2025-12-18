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
  cartProducts$ = this.cartProducts.asObservable();
  
  wishProductsLength$ = this.wishProducts$.pipe(
    map(products => products.length)
  );
  
  cartProductsLength$ = this.cartProducts$.pipe(
    map(products => products.length)
  );

  cartCounter = this.cartProductsLength$;
 

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
    
    const existing = currentCartProducts.find(p => p.title === product.title && p.price === product.price);
    
    if (existing) {
      existing.quantity++;   
    }else {
      product.quantity = 1;  
      currentCartProducts.push(product);
    }

    this.cartProducts.next(currentCartProducts);
    if (this.userId) {
      localStorage.setItem(`cartProducts_${this.userId}`, JSON.stringify(currentCartProducts));     
    }
  }



  increaseQuantity(product: any) {
    const currentCart = this.cartProducts.getValue();

    const item = currentCart.find(p => p.title === product.title);

    if (item) {
      item.quantity++;
      this.cartProducts.next(currentCart);

      if (this.userId) {
        localStorage.setItem(`cartProducts_${this.userId}`, JSON.stringify(currentCart));
      }
    }
  }

  decreaseQuantity(product: any) {
    const currentCart = this.cartProducts.getValue();

    const item = currentCart.find(p => p.title === product.title);

    if (item) {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        const updatedCart = currentCart.filter(p => p.title !== product.title);
        this.cartProducts.next(updatedCart);

        if (this.userId) {
          localStorage.setItem(`cartProducts_${this.userId}`, JSON.stringify(updatedCart));
        }
        return;
      }

      this.cartProducts.next(currentCart);
      if (this.userId) {
        localStorage.setItem(`cartProducts_${this.userId}`, JSON.stringify(currentCart));
      }
    }
  }

  getTotalCost() {
    const currentCart = this.cartProducts.getValue();
    return currentCart.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  }




  getWishProducts (){
    return this.wishProducts.getValue();
  }
  getCartProducts (){
    return this.cartProducts.getValue();
  }

}
