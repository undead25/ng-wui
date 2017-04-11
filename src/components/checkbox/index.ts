import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { UICheckbox } from './checkbox';

/**
 * @export
 * @class UICheckboxModule
 */
@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UICheckbox],
  declarations: [UICheckbox]
})

export class UICheckboxModule { }
