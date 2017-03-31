import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIButtonModule } from './button';
import { UIDialogModule } from './dialog';
import { UIInputModule } from './input';
import { UIProgressCircleModule } from './progress-circle';
import { UIPaginationModule } from './pagination';
import { UICheckboxModule } from './checkbox';
import { UIRadioModule } from './radio';
import { UITooltipModule } from './tooltip';
import { UISelectModule } from './select';

import './style/style.scss';

const MODULES = [
  UIButtonModule,
  UIDialogModule,
  UIInputModule,
  UIProgressCircleModule,
  UIPaginationModule,
  UICheckboxModule,
  UIRadioModule,
  UITooltipModule,
  UISelectModule,
];

@NgModule({
  imports: [BrowserAnimationsModule],
  exports: MODULES
})

export class UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
    };
  }
}
