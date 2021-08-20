import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  myImage: Observable<any>;
  constructor() { }

  ngOnInit() {
  }
  loadImage() {
    this.myImage = from(fetch('https://source.unsplash.com/random')).pipe(map(data => {
      console.log(data);
      return data.url

    }));
    this.myImage.subscribe(res => {
      console.log(res);

    })
  }
}
