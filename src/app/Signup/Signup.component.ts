import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedValidator } from '../confirm.validator';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-Signup',
  templateUrl: './Signup.component.html',
  styleUrls: ['./Signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private route:Router,private http:HttpClient,private toast:ToastrService,private fb:FormBuilder,private loginService:LoginService) { }

  signuser:any;
  retUrl:any="Purchase";

  ngOnInit() {
  }
  signup=this.fb.group({
    'nname':new FormControl('',[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{7,29}$')]),
    'npassword':new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,15}')]),
    'cpassword':new FormControl('',Validators.required)
  },{validator:ConfirmedValidator('npassword','cpassword')})

  signUpData(signup:FormGroup){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.nname===this.signup.value.nname && a.npassword===this.signup.value.npassword
      });

      if(user){
        this.toast.error("Existing Account please try with different username");
        this.signup.reset();
      }
      else{
        this.signuser=this.signup.value.nname;
        localStorage.setItem("loggedInuser",this.signup.value);
        this.http.post<any>("http://localhost:3000/signup",this.signup.value).subscribe(res=>{
          this.toast.success(this.signuser,("Account created Successfully"));
          this.signup.reset();
          this.loginService.userLoggedIn(this.signup.value.nname,this.signup.value.npassword).subscribe((data)=>{
            if(this.retUrl!=null){
              this.route.navigate([this.retUrl]);
            }
            })
        },err=>{
          alert('Something went wrong');
        }
        )
      }
    }
  )

  }


}
