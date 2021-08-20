import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazyloadimage',
  templateUrl: './lazyloadimage.page.html',
  styleUrls: ['./lazyloadimage.page.scss'],
})
export class LazyloadimagePage implements OnInit {
  defaultImage = "../../assets/150.png";
  image = 'https://images.unsplash.com/photo-1443890923422-7819ed4101c0?fm=jpg';
  constructor() { }

  ngOnInit() {
  }

}
