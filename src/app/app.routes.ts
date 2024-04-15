import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'orders' },
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'orders' },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    children: [
      { path: 'verify-phone', loadChildren: () => import('app/modules/auth/verify-phone/verify-phone.routes') },
      { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes') },
      { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes') },
      { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes') },
      { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes') },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver
    },
    children: [
      { path: 'register', loadChildren: () => import('app/modules/register/register.resolver') },
      // { path: 'dashboards', loadChildren: () => import('app/modules/dashboards/dashboard.resolver') },
      { path: 'settings', loadChildren: () => import('app/modules/settings/settings.resolver') },
      { path: 'support', loadChildren: () => import('app/modules/support/support.resolver') },
      { path: 'orders', loadChildren: () => import('app/modules/orders/orders.resolver') },
      { path: 'drivers', loadChildren: () => import('app/modules/drivers/drivers.resolver') },
      { path: 'finance', loadChildren: () => import('app/modules/finance/finance.resolver') },

      { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/shared/components/error-404/error-404.routes') },
      { path: '**', redirectTo: '404-not-found' }
    ]
  }
];
