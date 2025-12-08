import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgForOfContext } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent,FooterComponent, NavbarComponent ,NgFor ,SlicePipe ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {

  constructor(public router:Router){}

  goUpBtn!:HTMLButtonElement;

  
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
    this.scrollHandler("exploreScrollRightButton","exploreScrollLeftButton","exploreProductsContainer");
    
    this.goUpBtn=document.getElementById("goUpBtn") as HTMLButtonElement;
    
    this.goUpBtn.addEventListener('click',()=>{
      window.scrollTo({top:0,behavior:'smooth'});
    });
  }

  

  
  products = [
    {
      title: 'HeadPhone X200',
      discount: '-30%',
      image: '/assets/images/Products/1.png',
      price: 699,
      prevPrice:800
    },
    {
      title: 'Smartwatch Pro',
      discount: '-25%',
      image: '/assets/images/Products/2.png',
      price: 199,
      prevPrice:250
    },
    {
      title: 'Abibas shoes',
      discount: '-40%',
      image: '/assets/images/Products/3.png',
      price: 269,
      prevPrice:400
    },
    {
      title: 'Neko T-shirt',
      discount: '-40%',
      image: '/assets/images/Products/4.png',
      price: 239,
      prevPrice:400
    },
    {
      title: 'BlueDragon keyboard',
      discount: '-50%',
      image: '/assets/images/Products/5.png',
      price: 269,
      prevPrice:600
    },
    {
      title: 'GayStation Gamepad',
      discount: '-40%',
      image: '/assets/images/Products/6.png',
      price: 350,
      prevPrice:550
    },
    {
      title: 'HD Laptop',
      discount: '-40%',
      image: '/assets/images/Products/7.png',
      price: 450,
      prevPrice:550
    },
    {
      title: 'Smart screen',
      discount: '-40%',
      image: '/assets/images/Products/8.png',
      price: 399,
      prevPrice:550
    },
    {
      title: 'Modern chair',
      discount: '-40%',
      image: '/assets/images/Products/9.png',
      price: 500,
      prevPrice:550
    },
    {
      title: 'Modern couch',
      discount: '-40%',
      image: '/assets/images/Products/10.png',
      price: 459,
      prevPrice:550
    }
  ];
}
