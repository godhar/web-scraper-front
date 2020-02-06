import {Component} from '@angular/core';
import {ScraperService} from '../../services/scraper.service';
import {filter, map,switchMap, tap} from 'rxjs/operators';
import {ChartValue, WordDetail} from '../../models/scraper.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  view: any[] = [700, 400];

  results: object[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  gradient = true;
  showLegend = false;
  showLabels = true;

  constructor(private scraperService: ScraperService) {
    this.scraperService.chartUpdate
      .pipe(
        filter(val => val),
        switchMap(() => this.scraperService.scraperResults)
      ).pipe(
      map(data => this.mapChart(data))
    ).subscribe(chartData => this.results = chartData);
  }

  mapChart(data: WordDetail[]): ChartValue[] {
    return data.map(x => {
      return {name: x.word, value: x.count};
    });
  }
}
