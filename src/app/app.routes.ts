import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:'home' , component:HomePageComponent},
    {path:'signup' , component:SignUpComponent},
    {path:'wishlist' , component:WishListComponent},
    {path:'login' , component:LoginComponent},
    {path:'cart' , component:CartComponent},
    {path:'checkout' , component:CheckoutComponent},
    {path:'profile' , component:ProfileComponent},
    {path:'about' , component:AboutComponent},
    {path:'product/:id' , component:ProductDetailsComponent},
    {path:'**' , loadComponent: () => import('./error/error.component')
    .then(m => m.ErrorComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}