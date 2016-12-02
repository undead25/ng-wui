import { Component, Input, ElementRef, Renderer, NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBoolean } from '../util';

@Component({
  selector: 'ui-progress-circle',
  templateUrl: 'progress-circle.html'
})

export class UIProgressCircle {
  
}

@NgModule({
  imports: [CommonModule],
  exports: [UIProgressCircle],
  declarations: [UIProgressCircle],
  providers: [],
})
export class UIProgressCircleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIProgressCircleModule,
      providers: []
    };
  }
}
