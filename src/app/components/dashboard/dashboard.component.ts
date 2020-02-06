import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ScraperService} from '../../services/scraper.service';
import {switchMap, tap} from 'rxjs/operators';
import {LoaderService} from '../../services/loader.service';
import {MatChipInputEvent, MatSnackBar} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {CustomValidators, validateKeywordRequired} from '../../validators/chip.validator';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private counter = 0;
  selectable = true;
  removable = true;
  addOnBlur = true;

  form: FormGroup;
  keywords: string[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private scraperService: ScraperService,
              private fb: FormBuilder,
              private router: Router,
              private loaderService: LoaderService,
              private snackBar: MatSnackBar) {
    this.form = fb.group({
      url: ['', Validators.required],
      keywords: [this.keywords, CustomValidators.validateKeywords],
      scrapeType: ['keywords', Validators.required]
    }, {validator: validateKeywordRequired});
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(
      control => {
        if (control.scrapeType === 'keywords') {
          this.scraperService.setChart();
        }
      }
    );
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value.trim() !== '')) {
      this.form.controls[`keywords`].setErrors(null);
      const tempKeywords = this.form.controls[`keywords`].value;
      tempKeywords.push(value.trim());
      this.form.controls[`keywords`].setValue(tempKeywords);
      if (this.form.controls[`keywords`].valid) {
        this.form.controls[`keywords`].markAsDirty();
        input.value = '';
      } else {
        const index = this.keywords.findIndex(value1 => value1 === value.trim());
        if (index !== -1) {
          this.keywords.splice(index, 1);
        }
      }
    } else {
      this.form.controls[`keywords`].updateValueAndValidity();
    }
  }

  remove(word: string): void {
    const controller = this.form.controls[`keywords`];
    const index = this.keywords.indexOf(word, 0);

    if (index > -1) {
      this.keywords.splice(index, 1);
    }

    controller.updateValueAndValidity();
    controller.markAsDirty();
  }

  onSubmit(): Subscription | void {
    return this.scraperService.postUrl(this.form.value.url)
      .pipe(
        tap(() => this.loaderService.show()),
        switchMap(val => {
          return this.scraperService.pollUntilTaskFinished(val, this.form.value.keywords);
        })
      ).subscribe(data => {
        if (data[`status`] === 'no match') {
          this.endServerPolling();
          return this.openSnackMessage('no keyword matched to url page', 'No Match!');
        }
        if (data[`status`] === 'pending') {
          if (this.counter > 4) {
            this.endServerPolling();
            return this.openSnackMessage('connection error - bad URL', 'Server Error!');
          }
          return this.counter++;
        }
        this.endServerPolling();
        this.scraperService.setResults(data);
        this.router.navigate(['data']);
      });
  }

  openSnackMessage(msg: string, action: string) {
    this.snackBar.open(msg, action, {
      duration: 3000,
    });
  }

  endServerPolling(): void {
    this.scraperService.finishPolling();
    this.loaderService.hide();
  }
}
