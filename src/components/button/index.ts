import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { UIButton, UIAnchorButton } from './button';

/**
 * @export
 * @class UIButtonModule
 */
@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UIButton, UIAnchorButton],
  declarations: [UIButton, UIAnchorButton]
})

export class UIButtonModule { }
