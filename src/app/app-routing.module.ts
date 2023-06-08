import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { PurchaseComponent } from './Purchase/Purchase.component';
import { SignupComponent } from './Signup/Signup.component';
import { PaymentComponent } from './Payment/Payment.component';

const routes: Routes = [
  {
    path:'Login',component:LoginComponent
  },
  {
path:'Home',component:HomeComponent
},{
  path:'Signup',component:SignupComponent
},
{
  path:'ForgotPassword',component:ForgotPasswordComponent
},
{
  path:'Purchase',component:PurchaseComponent,canActivate:[AuthGuard]
},
{
  path:'cart',component:CartComponent
},
{
  path:'Payment',component:PaymentComponent
},
{
  path:'',component:HomeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
