import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UIInput } from './input';
import { TextareaAutosize } from './autosize';

/**
 * @export
 * @class UIInputModule
 */
@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [UIInput, TextareaAutosize],
  declarations: [UIInput, TextareaAutosize]
})

export class UIInputModule { }
