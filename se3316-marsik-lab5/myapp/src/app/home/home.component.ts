import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {MatExpansionModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  clickCounter: number = 0; 
  name: string = '';  // add this
  
  songs: Object;

  constructor(private _http: HttpService) { }

  ngOnInit() {
    this._http.getTop10().subscribe(data => {
      this.songs = data;
    });
  }
  
  countClick() {
    this.clickCounter += 1;
  }

}
