import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.css']
})
export class PaymentComponent implements OnInit {
  PaymentOption:boolean=true;
  visible:boolean=false;
  constructor(private formbuilder:FormBuilder,private toast:ToastrService,private route:Router) { }
  ngOnInit() {
  }
  address=this.formbuilder.group({
    'UserName':new FormControl('',[Validators.required,Validators.pattern('^[A-Za-z\\._-]{8,29}$')]),
    'Email':new FormControl('',[Validators.required,Validators.pattern("^[_A-Za-z-\+]+(\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$")]),
    'contact':new FormControl('',[Validators.required,Validators.pattern("(0|91)?[6-9][0-9]{9}")]),
    'address':new FormControl('',Validators.required),
    'city':new FormControl('Coimbatore',Validators.required)
  })
  gateway=this.formbuilder.group({
    'card':new FormControl('',Validators.required),
    'Expiry':new FormControl('',Validators.required),
    'cvv':new FormControl('',Validators.required)
  })
  onClick(){
   this.PaymentOption=!this.PaymentOption
   this.visible=!this.visible
   this.gateway.reset();
  }
  successOrder(){
    this.toast.success("Your order will be delivered soon");
    this.route.navigate(['Purchase']);
  }

}
