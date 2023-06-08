import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JuiceOrderDemo';

  constructor(private route:Router,private toast:ToastrService){}
  loggedIn(){
    return localStorage.getItem('loggedInuser');
  }
  logout(){
    if(confirm("Are you sure to leave this page")){
    localStorage.removeItem('loggedInuser');
    this.route.navigate(['Home']);
  };

  }
}
