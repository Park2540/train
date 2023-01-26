import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AccountComponent } from './account.component';
import { SettingsComponent } from './settings/settings.component';
import { DetailReportComponent } from '../../pages/detail/detail.component'
import{detailcomponent} from '../errors/error404/error404.component'
const routes: Routes = [
  {
    path: 'account',
    // component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountComponent,
      },
      // {
      //   path: 'overview',
      //   component: OverviewComponent,
      // },
      // {
      //   path: 'settings',
      //   component: SettingsComponent,
      // },
      {
        path: ':id',
        component: DetailReportComponent
      },
      // {
      //   path: 'followdetail/:id',
      //   component:detailcomponent
      // },

      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
