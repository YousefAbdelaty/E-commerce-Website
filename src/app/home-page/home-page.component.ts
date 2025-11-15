import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgForOfContext } from '@angular/common';
import { SlicePipe } from '@angular/common';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent ,NgFor ,SlicePipe ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  products = [
    {
      title: 'Smartphone X200',
      discount: '-30%',
      image: '/assets/images/Products/1.png',
      price: 699,
      prevPrice:800
    },
    {
      title: 'Wireless Headphones',
      discount: '-25%',
      image: '/assets/images/Products/2.png',
      price: 199,
      prevPrice:250
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/3.png',
      price: 299,
      prevPrice:400
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/4.png',
      price: 299,
      prevPrice:400
    },
    {
      title: 'Smartwatch Pro',
      discount: '-50%',
      image: '/assets/images/Products/5.png',
      price: 299,
      prevPrice:600
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/6.png',
      price: 299,
      prevPrice:550
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/7.png',
      price: 299,
      prevPrice:550
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/8.png',
      price: 299,
      prevPrice:550
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/9.png',
      price: 299,
      prevPrice:550
    },
    {
      title: 'Smartwatch Pro',
      discount: '-40%',
      image: '/assets/images/Products/10.png',
      price: 299,
      prevPrice:550
    }
  ];

  scrollHandler(rightScrollerID:string ,leftScrollerID:string , containerID:string ):any{

    const rightScroller = document.getElementById(rightScrollerID) as HTMLButtonElement;
    const leftScroller = document.getElementById(leftScrollerID) as HTMLButtonElement;
    const container = document.getElementById(containerID) as HTMLDivElement;

    rightScroller.addEventListener("click" , ()=>{

      const { scrollLeft, scrollWidth, clientWidth } = container;  
      if (scrollLeft + clientWidth >= scrollWidth - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 200, behavior: 'smooth' });
      }
      
    });

    leftScroller.addEventListener("click" , ()=>{
      const { scrollLeft, scrollWidth, clientWidth } = container;
      if (scrollLeft <= 5) {
        container.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -200, behavior: 'smooth' });
      }

    });
  }


  ngAfterViewInit(): void {
    this.scrollHandler("categoryScrollRightButton","categoryScrollLeftButton","categoriesBoxesWrapper");
    this.scrollHandler("flashScrollRightButton","flashScrollLeftButton","productsContainer");
    this.scrollHandler("bestSellingScrollRightButton","bestSellingScrollLeftButton","BestProductsContainer");
 
  }
}
