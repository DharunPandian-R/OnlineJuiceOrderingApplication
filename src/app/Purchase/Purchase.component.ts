import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../Cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-Purchase',
  templateUrl: './Purchase.component.html',
  styleUrls: ['./Purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  public productlist:any;
  constructor(private product:ProductsService,private toast:ToastrService,private cart:CartService) { }


  ngOnInit() {
    this.product.getProduct().subscribe(res=>{
      this.productlist=res;
      this.productlist.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price})

      });
      });

  }
  addToCart(item:any){
      this.cart.getProduct().subscribe(res=>{
        const user=res.find((a:any)=>{
          return a.id===item.id;
        });
        if(user){

          this.toast.success("Successfully added");
          user.total=user.price*(user.quantity+=1);
          this.cart.update(user.id,user).subscribe();

        }
        else{
          this.cart.addToCart(item).subscribe();

        }
      });


    }
    calculateDiscountPrice(item:any):number{
      const currentDate=new Date();
      const startDate=new Date(item.discount.start);
      const endDate=new Date(item.discount.end);
      if(currentDate>=startDate && currentDate<=endDate){
        const discountPercentage=item.discount.percentage/100;
        return item.price*(1-discountPercentage);
      }
      else{
        return item.price
      }
    }
    hasDiscount(item:any):boolean{
      const currentDate=new Date();
      const startDate=new Date(item.discount.start);
      const endDate=new Date(item.discount.end);
      return currentDate>=startDate && currentDate<=endDate;
    }
  }


