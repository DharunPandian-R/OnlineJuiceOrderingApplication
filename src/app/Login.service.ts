import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn:boolean=false;
  userName:string="";
  password:string=""
  constructor(private http:HttpClient) { }
  userLoggedIn(username:string,password:string){
    this.userName=username;
    this.password=password;
    this.isLoggedIn=true;
    return of(this.isLoggedIn);
  }
  isUserLoggedIn():boolean{
    return this.isLoggedIn;
  }
  updatePassword(id:any,body:any){
    return this.http.patch<any>("http://localhost:3000/signup"+"/"+id,body);


  }

}
