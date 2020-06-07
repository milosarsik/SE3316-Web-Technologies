import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  
  name: string = "";
  type: string ="";
  loanPeriod: number = 0;
  quantity: number = 0;

  constructor(private _http: HttpService) { }

  ngOnInit() {
  }

  updateQuantity()
  {
    console.log("In updateQuantity");
    
    this._http.postItems(this.name, this.type, this.loanPeriod, this.quantity).subscribe(
      (data:any) => {
        console.log("In subscribe" + data);
      })
  }
}
