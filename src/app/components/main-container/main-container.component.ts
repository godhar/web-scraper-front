import {Component, ViewEncapsulation} from '@angular/core';
import {ScraperService} from '../../services/scraper.service';
import {LocationStrategy} from '@angular/common';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainContainerComponent {

  constructor(private scraperService: ScraperService,
              private location: LocationStrategy) {}

  navBack(): void {
    this.location.back();
  }
}
