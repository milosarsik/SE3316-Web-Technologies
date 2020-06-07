import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {
  
  items: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getItems().subscribe(data => {
      this.items = data
      console.log(this.items);
    }
  );
  }
}