import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainContainerComponent } from './components/main-container/main-container.component';
import {
  MatButtonModule, MatCardModule,
  MatChipsModule, MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule, MatRadioModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {ScraperService} from './services/scraper.service';
import {HttpClientModule} from '@angular/common/http';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoaderComponent } from './components/loader/loader.component';
import {LoaderService} from './services/loader.service';
import { ChartComponent } from './components/chart/chart.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { NotFoundComponent } from './not-found/not-found.component';
import {NotFoundResolver} from './services/not-found-resolver';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    DynamicTableComponent,
    DashboardComponent,
    LoaderComponent,
    ChartComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    HttpClientModule,
    MatRadioModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterModule
  ],
  providers: [ScraperService, LoaderService, NotFoundResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
