import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthServiceService } from '../Services/auth.service.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [NavbarComponent ,NgClass ,FooterComponent  ,ReactiveFormsModule , HttpClientModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  nameInput!:HTMLInputElement;
  emailInput!:HTMLInputElement;
  passwordInput! : HTMLInputElement;

  userForm!: FormGroup;

  constructor(public router: Router ,public fb: FormBuilder , private api:AuthServiceService){
    this.userForm=this.fb.group({
      userName:['',[Validators.required , Validators.minLength(5) , Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      email:['' , [Validators.required , Validators.email]],
      password:['' , [Validators.required , Validators.minLength(6) , Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]]
    })
  }

  formSubmit():void{
    if(this.userForm.valid){
      this.api.signup(this.userForm.value).subscribe({
        next: (res)=>{
          console.log(res);
          this.router.navigate(['/home']);
          // this.nameInput.value='';
          // this.passwordInput.value='';
          // this.emailInput.value='';
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }



  
  togglePassword():any{
    if(this.passwordInput.type==='password'){
      this.passwordInput.type='text';
    }else {
      this.passwordInput.type='password'
    }
    
  }

  loginNavigate(){
    this.router.navigate(['/login']);
    window.scrollTo({top:0 ,behavior:'smooth'});
  }

  ngAfterViewInit(): void {
    this.passwordInput=document.getElementById('passwordInput') as HTMLInputElement;
    this.nameInput=document.getElementById('name') as HTMLInputElement;
    this.emailInput=document.getElementById('email') as HTMLInputElement;

  }


}
