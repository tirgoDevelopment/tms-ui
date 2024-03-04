import { Routes } from '@angular/router';
import { RegisterComponent } from './register.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step-3.component';

export default [
    {
        path     : '',
        component: RegisterComponent,
        resolve  : {},
        children: [
            {path: 'step2', component: Step2Component},
            {path: 'step3', component: Step3Component},
        ]
    },
] as Routes;
