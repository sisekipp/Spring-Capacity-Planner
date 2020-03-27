import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'planner',
    loadChildren: () => import('./planner/planner.module').then(m => m.PlannerModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: '',
    redirectTo: 'planner',
    pathMatch: 'full'
  }
];
