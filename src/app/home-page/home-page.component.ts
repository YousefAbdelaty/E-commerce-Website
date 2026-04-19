import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { NgFor, NgForOfContext } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ProductCardComponent,FooterComponent, NavbarComponent ,NgFor ,SlicePipe ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {

  products :any[] =[];
  constructor(public router:Router , private prods : ProductsSharingServiceService){}

  goUpBtn!:HTMLButtonElement;

  
  ngOnInit(){
    this.prods.getAllProducts().subscribe({
      next:(res)=>{
        this.products=res;
      }
    });
    this.startTimer();
  }
  
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

  


  targetDate = new Date('2026-5-01').getTime();

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  private intervalId: any;

  startTimer(): void {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      const diff = this.targetDate - now;

      if (diff <= 0) {
        clearInterval(this.intervalId);
        this.days = this.hours = this.minutes = this.seconds = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      this.days = this.format(d);
      this.hours = this.format(h);
      this.minutes = this.format(m);
      this.seconds = this.format(s);

    }, 1000);
  }

  format(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
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

  

  
  
}
