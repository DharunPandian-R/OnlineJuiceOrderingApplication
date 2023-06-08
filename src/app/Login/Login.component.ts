import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../Login.service';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  login:FormGroup|any;
  retUrl:any="Home";
  constructor(private http:HttpClient,private route:Router,private toast:ToastrService,private router:ActivatedRoute,private loginService:LoginService) { }

  ngOnInit() {
    this.login=new FormGroup({
      'fname':new FormControl('',[Validators.required,Validators.minLength(3)]),
      'fpassword':new FormControl('',[Validators.required])
    });
    this.router.queryParamMap.subscribe(parama=>{
      this.retUrl=parama.get('retUrl');
    })
  }
  loginData(login:FormGroup){
    this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user=res.find((a:any)=>{
        return a.nname===this.login.value.fname && a.npassword===this.login.value.fpassword
      });
        if(user){
        this.loginService.userLoggedIn(this.login.value.fname,this.login.value.fpassword).subscribe((data)=>{
        if(this.retUrl!=null){
          this.route.navigate([this.retUrl]);
        }
        })
        localStorage.setItem("loggedInuser",this.login.value);
        this.toast.success(this.login.value.fname,"Welcome");
        this.login.reset();
        this.route.navigate(['Purchase']);

      }
      else{
        this.toast.error('User not Found or Incorrect username or password');
        this.route.navigate(['Login']);
      }
    }
  )
}

}
