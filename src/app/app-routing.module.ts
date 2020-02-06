import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainContainerComponent} from './components/main-container/main-container.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NotFoundResolver} from './services/not-found-resolver';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'data',
    pathMatch: 'full',
    component: MainContainerComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    resolve: {data: NotFoundResolver}
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
