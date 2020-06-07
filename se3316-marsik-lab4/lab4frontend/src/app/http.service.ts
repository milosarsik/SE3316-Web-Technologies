import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get('http://18.212.68.111:8080/api/bears')
  }
  
  postItems(name, type, loanPeriod, quantity)
  {
    
    console.log("In postItems");
    return this.http.post("http://18.212.68.111:8080/api/bears",
    {
        "name": name,
        "type": type,
        "loanPeriod": loanPeriod,
        "quantity": quantity
    }, httpOptions)
  }
}

const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'application/json'
      })
  };
