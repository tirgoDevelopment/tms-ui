import { Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { AvailableOrdersComponent } from './components/available/available.component';
import { ActiveOrdersComponent } from './components/active/active.component';
import { ArchivedOrdersComponent } from './components/archived/archived.component';

export default [
  {
    path: '',
    component: OrdersComponent,
    resolve: {},
    children: [
      { path: 'available', component: AvailableOrdersComponent },
      { path: 'active', component: ActiveOrdersComponent },
      { path: 'archived', component: ArchivedOrdersComponent },
    ]
  },
] as Routes;
