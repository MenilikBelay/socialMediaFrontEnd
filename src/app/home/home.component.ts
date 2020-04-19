import { PostSearchComponent } from './../post-search/post-search.component';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../css/color.css',
    '../../css/responsive.css', '../../css/style.css',
    '../../css/strip.css'],
 
})

export class HomeComponent implements OnInit {

  constructor() { }

  
  ngOnInit(): void {
  }

}
