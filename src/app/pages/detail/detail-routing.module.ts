// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';


// const routes: Routes = [];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class DetailRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { OverviewComponent } from './overview/overview.component';
// import { AccountComponent } from './account.component';
// import { SettingsComponent } from './settings/settings.component';
import {ActiondetailComponent} from './actiondetail/actiondetail.component'
import {FinishdetailComponent} from './finishdetail/finishdetail.component'
import { DetailReportComponent } from '../../pages/detail/detail.component'
// import{detailcomponent} from '../errors/error404/error404.component'
const routes: Routes = [
  {
   
        path: 'Finish',
        component: FinishdetailComponent,
      },
      {
        path: 'Action',
        component: ActiondetailComponent,
      
      
    //   { path: '', redirectTo: 'overview', pathMatch: 'full' },
    //   { path: '**', redirectTo: 'overview', pathMatch: 'full' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
