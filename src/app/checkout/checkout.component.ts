import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { ProductsSharingServiceService } from '../Services/products.sharing.service.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../Services/toast.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, FooterComponent, CommonModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  form!:FormGroup;

  constructor(public router:Router , public fb:FormBuilder ,public toast:ToastService , private products : ProductsSharingServiceService){
    this.form= this.fb.group({
      fName:['' , Validators.required],
      sAddress:['' , Validators.required],
      city:['' , Validators.required],
      phone:['' , Validators.required],
      email:['' , Validators.required],
    });
  }

  cartProducts! : any[];
  cartTotalCost! : number;
  
  formSubmit(){
    if(this.form.valid ){
      this.toast.show('Order placed successufully!');
      this.router.navigate(['/home']);
      window.scrollTo({top:0,behavior:'smooth'});
    }else{
      this.toast.show('Please check your billing details!' , 'error');
    }
  }
  


  ngOnInit(){
    this.products.cartProducts$.subscribe(products =>{
      this.cartProducts = products;
    })

    this.cartTotalCost = this.products.getCartTotal();
    console.log(this.cartTotalCost);
  }

}
