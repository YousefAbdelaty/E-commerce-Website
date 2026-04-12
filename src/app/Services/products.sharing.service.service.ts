import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsSharingServiceService {

  private userId: string | null = null;
  private apiUrl = 'https://ecommerce.routemisr.com/api/v1/products';

  // products = [
  //   {
  //     id:0,
  //     title: 'HeadPhone X200',
  //     discount: '-30%',
  //     mainImage: '/assets/images/Products/1.png',
  //     moreImages: ['/assets/images/Products/1.png','/assets/images/Products/2.png' ,'/assets/images/Products/3.png' , '/assets/images/Products/4.png' , '/assets/images/Products/5.png' ],
  //     price: 699,
  //     prevPrice:800
  //   },
  //   {
  //     id:1,
  //     title: 'Smartwatch Pro',
  //     discount: '-25%',
  //     mainImage: '/assets/images/Products/2.png',
  //     moreImages: ['/assets/images/Products/2.png','/assets/images/Products/1.png' ,'/assets/images/Products/3.png' , '/assets/images/Products/4.png' , '/assets/images/Products/5.png' ],
  //     price: 199,
  //     prevPrice:250
  //   },
  //   {
  //     id:2,
  //     title: 'Abibas shoes',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/3.png',
  //     moreImages: ['/assets/images/Products/3.png','/assets/images/Products/4.png' ,'/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png' ],
  //     price: 269,
  //     prevPrice:400
  //   },
  //   {
  //     id:3,
  //     title: 'T-shirt',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/4.png',
  //     moreImages: ['/assets/images/Products/4.png','/assets/images/Products/3.png' ,'/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png' ],
  //     price: 239,
  //     prevPrice:400
  //   },
  //   {
  //     id:4,
  //     title: 'BlueDragon keyboard',
  //     discount: '-50%',
  //     mainImage: '/assets/images/Products/5.png',
  //     moreImages: ['/assets/images/Products/5.png','/assets/images/Products/6.png' , '/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png'],
  //     price: 269,
  //     prevPrice:600
  //   },
  //   {
  //     id:5,
  //     title: 'Gamepad',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/6.png',
  //     moreImages: ['/assets/images/Products/6.png','/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/5.png' , '/assets/images/Products/7.png'],
  //     price: 350,
  //     prevPrice:550
  //   },
  //   {
  //     id:6,
  //     title: 'HD Laptop',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/7.png',
  //     moreImages: ['/assets/images/Products/7.png','/assets/images/Products/8.png' , '/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png'],
  //     price: 450,
  //     prevPrice:550
  //   },
  //   {
  //     id:7,
  //     title: 'Smart screen',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/8.png',
  //     moreImages: ['/assets/images/Products/8.png','/assets/images/Products/7.png' , '/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png'],
  //     price: 399,
  //     prevPrice:550
  //   },
  //   {
  //     id:8,
  //     title: 'Modern chair',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/9.png',
  //     moreImages: ['/assets/images/Products/9.png','/assets/images/Products/10.png' , '/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png'],
  //     price: 500,
  //     prevPrice:550
  //   },
  //   {
  //     id:9,
  //     title: 'Modern couch',
  //     discount: '-40%',
  //     mainImage: '/assets/images/Products/10.png',
  //     moreImages: ['/assets/images/Products/10.png','/assets/images/Products/9.png' , '/assets/images/Products/5.png' , '/assets/images/Products/6.png' , '/assets/images/Products/7.png'],
  //     price: 459,
  //     prevPrice:550
  //   }
  // ];
  private productsSnapshot: any[] = [];

  
  
  
  constructor( private http:HttpClient) { 
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.loadUserWishlist();
      this.loadUserCart();
    }
  }

getAllProducts(): Observable<any[]> {
  return this.http.get<any>(this.apiUrl).pipe(
    map(response => response.data.map((item: any) => ({
      id:        item._id,
      title:     item.title,
      discount:  `-${40}%`,
      mainImage: item.imageCover,
      moreImages: item.images as Array<any>,
      price:     item.price,
      prevPrice: item.price+(item.price * 0.4)
    })))
  );
}



  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const item = response.data;
        return {
          id:         item._id,
          title:      item.title,
          discount:   `-${40}%`,
          mainImage:  item.imageCover,
          moreImages: item.images as Array<any>,
          price:      item.price,
          description:      item.description,
          prevPrice:  item.price + (item.price * 0.4)
        };
      })
    );
  }

  getAllProductsSnapshot(): any[] {
    return this.productsSnapshot;
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



  private cartTotalCost = new BehaviorSubject<number>(0);
  cartTotalCost$ = this.cartTotalCost.asObservable();

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
  // cartTotalCost :number = 0;

  setCartTotal(total : number){
    this.cartTotalCost.next(total);
  }

  getCartTotal(){
    return this.cartTotalCost.getValue();
  }
 

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
    
    const existing = currentCartProducts.find(p => p.title === product.title && p.price === product.price && p.id === product.id  );
    
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
