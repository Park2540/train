import { Routes } from '@angular/router';
import { ListsComponent } from '../modules/widgets-examples/lists/lists.component';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  // {
  //   path: 'detail',
  //   loadChildren: () =>
  //     import('./detail/detail.module').then((m) => m.DetailModule),
  // },
  {
    path: 'List',
    loadChildren: () =>
      import('../modules/widgets-examples/lists/lists.module').then((m) => m.ListsModule),
  },
  // {
  //   path: 'modalpopup',
  //   loadChildren: () =>
  //     import('../modules/widgets-examples/lists/modalpopup/modalpopup.module').then((m) => m.modalpopupModule),
  // },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
