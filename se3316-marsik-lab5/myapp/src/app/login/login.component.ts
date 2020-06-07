import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String="";
  password: String="";
  response: String="Login unsucessful!";
  user: Object;
  
  constructor(private router:Router, private _http:HttpService) { }

  ngOnInit() {
  }

  register()
  {
    this.router.navigate(['/register']);
  }
  
  validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  
  verifyLogin()
  { 
    if(!(this.validateEmail(this.email))){
      return  alert("Invalid email!")
      
    }
     else if (this.email == "" ){
        
         return  alert("Enter an email")
      }
    else if( this.password == "") {
           return  alert("Enter a password")
        }
    else{
          this._http.login(this.email,this.password).subscribe(result =>
          {
            console.log(result);
            if(result["email"] == this.email){
                  if(result["isActive"]){
                    this.response = "You are logged in!";
                    this._http.hideLinks();
                          if(result["isAdmin"]){
                            this.router.navigate(['/administrator-view']);
                            alert("Welcome back admin " + this.email);
                                }
                      }
                else{
                  alert("This account is deactivated, please contact the site manager!");
                }

              }
              else{
                alert("Incorrect email!");
              }
        });
  } 
}
}