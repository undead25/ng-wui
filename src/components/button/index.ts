import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { UIButton, UIAnchorButton, UIRaisedButton, UIIconButton, UIFabButton, UIOutlineButton } from './button';

/**
 * @export
 * @class UIButtonModule
 */
@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UIButton, UIAnchorButton, UIRaisedButton, UIIconButton, UIFabButton, UIOutlineButton],
  declarations: [UIButton, UIAnchorButton, UIRaisedButton, UIIconButton, UIFabButton, UIOutlineButton]
})

export class UIButtonModule { }
