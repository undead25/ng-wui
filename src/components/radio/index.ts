import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { UIRadio } from './radio';

@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UIRadio],
  declarations: [UIRadio]
})

export class UIRadioModule { }
