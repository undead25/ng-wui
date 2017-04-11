import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { UISwitch } from './switch';

@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UISwitch],
  declarations: [UISwitch]
})

export class UISwitchModule { }
