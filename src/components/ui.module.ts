import { NgModule, ModuleWithProviders } from '@angular/core';
import { UIButtonModule } from './button';
import { UIDialogModule } from './dialog';
import { UIInputModule } from './input';
// import { UIPaginationModule } from './pagination';

import './style/style.scss';

const MODULES = [
  UIButtonModule,
  UIDialogModule,
  UIInputModule,
];

@NgModule({
  exports: MODULES
})

export class UIModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIModule,
    };
  }
}
