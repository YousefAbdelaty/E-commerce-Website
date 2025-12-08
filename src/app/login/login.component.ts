import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthServiceService } from '../Services/auth.service.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userForm!:FormGroup;

  constructor(public router:Router ,public fb:FormBuilder , private api:AuthServiceService){
    this.userForm=this.fb.group({
      email : ['',[Validators.required]],
      password: ['',[Validators.required]]
    });
  }

  formSubmit(){
    if(this.userForm.valid){
      this.api.login(this.userForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          this.router.navigate(['/home']);
          window.scrollTo({top:0 ,behavior:'smooth'});
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }

  
  passwordInput! : HTMLInputElement;
  
  togglePassword():any{
    if(this.passwordInput.type==='password'){
      this.passwordInput.type='text';
    }else {
      this.passwordInput.type='password'
    }
    
  }

  signupNavigate(){
    this.router.navigate(['/signup']);
  }

  

  ngAfterViewInit(): void {
    this.passwordInput=document.getElementById('passwordInput') as HTMLInputElement;
  }
}
