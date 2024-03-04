import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

export default [
    {
        path     : '',
        component: SettingsComponent,
        resolve  : {
        },
    },
] as Routes;
