import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIProgressCircle } from './progress-circle';

/**
 * @export
 * @class UIProgressCircleModule
 */
@NgModule({
  imports: [CommonModule],
  exports: [UIProgressCircle],
  declarations: [UIProgressCircle],
  providers: [],
})

export class UIProgressCircleModule { }
