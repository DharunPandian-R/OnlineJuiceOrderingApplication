import { Component, OnInit } from '@angular/core';
import { CartService } from '../Cart.service';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
public products:any;
public listproduct:any;
sum:any;
numberofitems:any;
  constructor(private cart:CartService,private http:HttpClient,private toast:ToastrService) { }
  ngOnInit() {
    this.cart.getProduct().subscribe(res=>{
      this.products=res;
      let totalitem =Object.keys(this.products);
        this.numberofitems=totalitem.length;
     });


  }


  inc(list:any){
    this.cart.getProduct().subscribe(res=>{
      const val=res.find((a:any)=>{
        return a.id===list.id
      });
     if(val){
      list.total=list.price*(list.quantity+=1);
      this.cart.update(list.id,list).subscribe();
      this.cart.getProduct().subscribe(res=>{
        this.listproduct=res;
        this.sum=0;
        this.listproduct.forEach((a:any) => {
          this.sum+= +a.total;
        });
        });

     }

  })
}

dec(list:any){
  this.cart.getProduct().subscribe(res=>{
    const val=res.find((a:any)=>{
      return a.title===list.title
    });
   if(val &&list.quantity!=1){
    list.total=list.price*(list.quantity-=1);

    this.cart.update(list.id,list).subscribe();
    this.sum=this.sum-(val.total-list.total);

   }
})
}
  verify(){
    if(this.numberofitems==0){
      return false;
    }
    else{
      return true;
    }
  }

  deleteItem(id:any){
  this.cart.deleteProduct(id).subscribe((data)=>{
    this.toast.success("Successfully removed");
  })
  this.cart.getProduct().subscribe(response=>{
    this.products=response;
  })

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
  inc1(list:any){
    this.cart.getProduct().subscribe(res=>{
      const val1=res.find((a:any)=>{
        return a.id===list.id
      });
     if(val1){
      list.total=this.calculateDiscountPrice(list)*(list.quantity+=1);
      this.cart.update(list.id,list).subscribe();
      this.cart.getProduct().subscribe(res=>{
        this.listproduct=res;
        this.sum=0;
        this.listproduct.forEach((a:any) => {
          this.sum+=+a.total;
        });
        });

     }

  })
}

dec1(list:any){
  this.cart.getProduct().subscribe(res=>{
    const val1=res.find((a:any)=>{
      return a.title===list.title
    });
   if(val1 &&list.quantity!=1){
    list.total=this.calculateDiscountPrice(list)*(list.quantity-=1);

    this.cart.update(list.id,list).subscribe();
    this.sum=this.sum-(val1.total-list.total);

   }
})
}

}
