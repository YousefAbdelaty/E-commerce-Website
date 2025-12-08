import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSharingServiceService {

  constructor() { }
  private wishCounter = new BehaviorSubject<number>(0);
  wishCounter$ = this.wishCounter.asObservable();

  private wishProducts = new BehaviorSubject<any[]>([]);
  wishProducts$ = this.wishProducts.asObservable();


  setWishProducts(product : any){
    const currentWishProducts = this.wishProducts.getValue();
    if(!currentWishProducts.find(p => p.title === product.title && p.price === product.price)){
      currentWishProducts.push(product);
      this.wishProducts.next(currentWishProducts);
    }
  }

  getWishProducts (){
    return this.wishProducts.getValue();
  }

  increaseWishCounter():any{
    const currentVal = this.wishCounter.getValue();
    this.wishCounter.next(currentVal+1);
  }
}
