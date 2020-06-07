import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  
  users: Object;

  getBeer() {
    return this.http.get('https://api.openbrewerydb.org/breweries')
  }
  
  register(email, password) {
    return this.http.post("http://52.70.152.45:8080/api/open/register",
      {
        "email": email,
        "password": password
      },{responseType: 'text'})
    }
    
    login(email, password)
    {
      return this.http.put("http://52.70.152.45:8080/api/user",
        {        
          "email":email,"password": password
          
        }, httpOptions)

    }
    
  getTop10() {
    return this.http.get("http://52.70.152.45:8080/api/open/songs");
  }
  
  hideLinks(){
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("logout").style.display = "block";
  }
  
  showLinks(){
    document.getElementById("register").style.display = "block";
    document.getElementById("login").style.display = "block";
  }
  
  showLogout(){
    document.getElementById("logout").style.display = "block";
  }
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept': 'application/json'
    
  })
};
