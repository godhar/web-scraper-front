import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  img: SafeUrl;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.img = this.route.snapshot.data[`data`];
  }
}
