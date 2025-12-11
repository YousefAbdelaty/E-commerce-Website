import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
    {path:'home' , component:HomePageComponent},
    {path:'signup' , component:SignUpComponent},
    {path:'wishlist' , component:WishListComponent},
    {path:'login' , component:LoginComponent},
    {path:'cart' , component:CartComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule,RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}