import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {

    linkList! :HTMLElement;
    homeLink! :HTMLElement;
    contactLink! :HTMLElement;
    aboutLink! :HTMLElement;
    signLink! :HTMLElement;
    navContainer! : HTMLElement;

ngAfterViewInit(): void {

      this.homeLink = document.getElementById('link1') as HTMLElement;
      this.contactLink = document.getElementById('link2') as HTMLElement;
      this.aboutLink = document.getElementById('link3') as HTMLElement;
      this.signLink = document.getElementById('link4') as HTMLElement;
      this.linkList = document.getElementById('linkList') as HTMLElement;
      this.navContainer=document.getElementById('navContainer') as HTMLElement;
        
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
    }



   
  }
