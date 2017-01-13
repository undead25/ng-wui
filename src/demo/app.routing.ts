import { Routes } from '@angular/router';

import { Home } from './home/home';
import { ButtonDemo } from './button/button-demo';
import { DialogDemo } from './dialog/dialog-demo';
import { InputDemo } from './input/input-demo';
import { ProgressCircleDemo } from './progress-circle/progress-circle-demo';
import { PaginationDemo } from './pagination/pagination-demo';
import { CheckboxDemo } from './checkbox/checkbox-demo';
import { RadioDemo } from './radio/radio-demo';
import { TooltipDemo } from './tooltip/tooltip-demo';


export const ROUTES: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'button', component: ButtonDemo },
  { path: 'dialog', component: DialogDemo },
  { path: 'input', component: InputDemo },
  { path: 'input', component: InputDemo },
  { path: 'progress-circle', component: ProgressCircleDemo },
  { path: 'pagination', component: PaginationDemo },
  { path: 'checkbox', component: CheckboxDemo },
  { path: 'radio', component: RadioDemo },
  { path: 'tooltip', component: TooltipDemo },
];
