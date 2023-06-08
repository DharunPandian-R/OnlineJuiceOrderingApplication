import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator1 } from '../confirm.validator';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-ForgotPassword',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private route:Router,private login:LoginService,private http:HttpClient,private toast:ToastrService,private fb:FormBuilder) { }
  id:any;
  ngOnInit() {
  }
  forgotpassword=this.fb.group({
    'name':new FormControl('',[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{7,29}$')]),
    'setpassword':new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,15}')]),
    'cpassword':new FormControl('',Validators.required)
  },{validator:ConfirmedValidator1('setpassword','cpassword')})
  forgotPasswordData(forgotpassword:FormGroup){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        this.id=a.id;
        return a.nname===this.forgotpassword.value.name;

      });
      var body={
        'npassword':this.forgotpassword.value.setpassword,
        'cpassword':this.forgotpassword.value.cpassword
      }
      if(user){
          this.login.updatePassword(this.id,body).subscribe();
          this.toast.success("Successfully updated");
          this.route.navigate(['Login']);
    }
      else{
        this.toast.error("No such account is there");
        this.forgotpassword.reset();

      }
    }
  )

  }





}
