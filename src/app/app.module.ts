import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HomeComponent } from './Home/Home.component';
import { LoginComponent } from './Login/Login.component';
import { SignupComponent } from './Signup/Signup.component';
import { ForgotPasswordComponent } from './ForgotPassword/ForgotPassword.component';
import { PurchaseComponent } from './Purchase/Purchase.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './Payment/Payment.component';

@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent,
      ForgotPasswordComponent,
      PurchaseComponent,
      CartComponent,
      PaymentComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
   ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
