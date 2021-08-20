import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.page.html',
  styleUrls: ['./infinitescroll.page.scss'],
})
export class InfinitescrollPage implements OnInit {
  users = [];
  page = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  loadusers() {

  }
}
