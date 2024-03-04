import { Routes } from '@angular/router';
import { DriversComponent } from './drivers.component';
import { ActiveDriversComponent } from './components/active/active.component';
import { ArchivedDriversComponent } from './components/archived/archived.component';


export default [
  {
    path: '',
    component: DriversComponent,
    resolve: {},
    children: [
      {path: 'active', component: ActiveDriversComponent},
      {path: 'archived', component: ArchivedDriversComponent}
    ]
  },
] as Routes;
