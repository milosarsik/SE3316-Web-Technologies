import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private _http:HttpService) { }
  
  email: String="";
  password: String="";
  response: String="";
  
  ngOnInit() {
  }
  
  validateEmail(email) 
  {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }

  createUser()
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
   
   var isValid = this.validateEmail(this.email); 
    if(!isValid)
    {
      this.response = "Invalid email format!"
    }
    else{
      this._http.register(this.email,this.password).subscribe(data => {
        this.response = data.toString();
        
        if (this.response == "This email already exists!"){
          alert("This email already exists!");
        }
        else{
          
        }
    });
  }
  }
}