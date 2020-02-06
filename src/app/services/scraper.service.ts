import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {
  catchError,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import {BehaviorSubject, EMPTY, interval, Observable, Subject} from 'rxjs';
import {WordDetail} from '../models/scraper.model';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {

  private results$ = new BehaviorSubject<WordDetail[]>(null);
  private initChart$ = new BehaviorSubject<boolean>(false);
  private pollRequestDone$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  setChart(): void {
    this.initChart$.next(true);
  }

  get chartUpdate(): Observable<boolean> {
    return this.initChart$.asObservable();
  }

  setResults(data: WordDetail[]): void {
    this.results$.next(data);
  }

  get scraperResults(): Observable<WordDetail[]> {
    return this.results$.asObservable();
  }

  finishPolling(): void {
    this.pollRequestDone$.next(true);
  }

  postUrl(val: string): Observable<any> {
    return this.http.post('/api/start', {url: val})
      .pipe(
        map((res: { jobId: string }) => {
          if (res.jobId) {
            return res.jobId;
          }
        }));
  }

  pollUntilTaskFinished(jobId: string, keywords: string[]): Observable<any> {

    return interval(4000)
      .pipe(
        takeUntil(this.pollRequestDone$),
        switchMap(() => this.http.get(`/api/results/${jobId}`,
          {
            params: new HttpParams()
              .set('keywords', keywords.join(','))
          })))
      .pipe(catchError(err => this.handleError(err)),
        map(res => res));
  }

  handleError(data: HttpErrorResponse) {
    if (data.status === 202) {
      return EMPTY;
    }
  }
}
