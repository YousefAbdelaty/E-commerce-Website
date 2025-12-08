import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth.service.service';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(public router: Router , private auth:AuthServiceService , private productSharing:ProductsSharingServiceService ){}
  // @ViewChild("wishNumber") wishNumber!: HTMLParagraphElement;

  wishCart!: HTMLDivElement;
  linkList! :HTMLElement;
  homeLink! :HTMLElement;
  contactLink! :HTMLElement;
  aboutLink! :HTMLElement;
  signLink! :HTMLElement;
  navContainer! : HTMLElement;
  wishCounter! : number;
  wishNumber! : HTMLParagraphElement;


ngOnInit(){
 
}

ngAfterViewInit(): void {
      this.wishCart = document.getElementById('wishCart') as HTMLDivElement;
      this.homeLink = document.getElementById('link1') as HTMLElement;
      this.contactLink = document.getElementById('link2') as HTMLElement;
      this.aboutLink = document.getElementById('link3') as HTMLElement;
      this.signLink = document.getElementById('link4') as HTMLElement;
      this.linkList = document.getElementById('linkList') as HTMLElement;
      this.navContainer=document.getElementById('navContainer') as HTMLElement;
      this.wishNumber = document.getElementById('wishNumber') as HTMLParagraphElement;
      this.linkList.addEventListener('click' ,(event : any) =>{

          if(event.target.tagName ==='LI'){

            Array.from(this.linkList.children).forEach((el:any)=>{
              el.classList.remove('active');
              el.classList.add('inactive');

            });

            event.target.classList.add('active');
            event.target.classList.remove('inactive');
          }
        });


        window.addEventListener('scroll' , ()=>{
          if(window.scrollY>0){
            this.navContainer.style.paddingTop = "1rem";
            this.navContainer.style.paddingBottom = "0rem";
          }
        });

        window.addEventListener('click' , (event:any)=>{
           const clickedInside = this.wishCart.contains(event.target);
          if (!clickedInside) {
            this.showDropdown = false;
          }
        })


         this.auth.isLoggedIn$.subscribe(isLogged=>{
          if(isLogged){
            this.wishCart.style.visibility="visible";
          }else{
            this.wishCart.style.visibility="hidden";
          }
  })
  

  
  this.productSharing.wishProductsLength$.subscribe(length =>{
    if(length>=1 && this.auth.isLoggedIn){
      this.wishNumber.style.visibility="visible";
      this.wishCounter=length;
      this.signLink.style.visibility='hidden';
    }else {
      this.wishNumber.style.visibility="hidden";
      
    }
    
  })
  
}


signUpNavigate():void{
  this.router.navigate(['/signup']);
  window.scrollTo({top:0 ,behavior:'smooth'});
}
homeNavigate(){
  this.router.navigate(['/home']);
  window.scrollTo({top:0 ,behavior:'smooth'});
}

logout(){
  this.auth.logout();
  this.showDropdown=false;
  // this.productSharing.clearWishlistOnLogout();
  this.wishNumber.style.visibility='hidden';
  this.signLink.style.visibility='visible';
  window.scrollTo({top:0 ,behavior:'smooth'});
}
      
  
showDropdown = false;

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}


}
