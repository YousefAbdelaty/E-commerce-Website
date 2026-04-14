import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../Services/auth.service.service';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
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
  cartCounter! : number;
  wishNumber! : HTMLParagraphElement;
  cartNumber! : HTMLParagraphElement;


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
      this.cartNumber = document.getElementById('cartNumber') as HTMLParagraphElement;
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
            this.wishCart.style.display="flex";
            this.signLink.style.display="none"
          }else if(!isLogged){
            this.wishCart.style.display="none";
            this.signLink.style.display="flex"
          }
  })
  

  
  this.productSharing.wishProductsLength$.subscribe(length =>{
    if( this.auth.isLoggedIn && length>=1 ){
      this.wishNumber.style.backgroundColor="#db4444";
      this.wishCounter=length;
      this.signLink.style.display='none';
    }else if(length<1){
      this.wishNumber.style.backgroundColor="transparent";
      
    }
   
  });

  this.productSharing.cartProductsLength$.subscribe(length =>{
    if(length>=1 && this.auth.isLoggedIn){
      this.cartCounter=length;
      this.cartNumber.style.backgroundColor="#db4444";;
      console.log(this.cartCounter);
    }else if(length<1){
      this.cartNumber.style.backgroundColor="transparent";
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
wishNavigate(){
  this.router.navigate(['/wishlist']);
  window.scrollTo({top:0 ,behavior:'smooth'});
}
cartNavigate(){
  this.router.navigate(['/cart']);
  window.scrollTo({top:0 ,behavior:'smooth'});
}
aboutNavigate(){
  this.router.navigate(['/about']);
  window.scrollTo({top:0 ,behavior:'smooth'});
}


logout(){
  this.auth.logout();
  this.showDropdown=false;
  // this.productSharing.clearWishlistOnLogout();
  this.wishNumber.style.display='none';
  this.signLink.style.visibility='visible';
  window.scrollTo({top:0 ,behavior:'smooth'});
  this.router.navigate(['/home'])
}
      
  
showDropdown = false;

toggleDropdown() {
  this.showDropdown = !this.showDropdown;
}


}
