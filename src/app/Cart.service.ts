import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
constructor(private http:HttpClient,private toast:ToastrService) { }
grand:any=0;
addToCart(product:any){
  this.toast.success("Successfully added");
  return this.http.post<any>("http://localhost:3000/CartItem",product);
}

getProduct(){
  return this.http.get<any>("http://localhost:3000/CartItem");
}
deleteProduct(body:any){
   return this.http.delete("http://localhost:3000/CartItem"+"/"+body);
}
update(id:number,body:any){
  return this.http.patch<any>("http://localhost:3000/CartItem"+"/"+id,body);
}





}
