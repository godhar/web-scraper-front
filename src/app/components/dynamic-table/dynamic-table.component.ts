import {Component} from '@angular/core';
import {ScraperService} from '../../services/scraper.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css']
})
export class DynamicTableComponent {

  scraperDetail$ = this.scraperService.scraperResults;
  showTable = false;
  columns = ['word', 'count'];

  constructor(private scraperService: ScraperService) {
    this.scraperDetail$.subscribe(val => {
      if (val && val.length > 0) {
        this.showTable = true;
      }
    });
  }
}
