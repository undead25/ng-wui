import { Component, Input, Output, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBoolean, setUid } from '../util';

/** Register ControlValueAccessor to support [(ngModel)] and ngControl */
export const SWITCH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UISwitch),
  multi: true
};

@Component({
  selector: 'ui-switch',
  templateUrl: './switch.html',
  styleUrls: ['./switch.scss'],
  providers: [SWITCH_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ui-switch]': 'true'
  }
})

export class UISwitch implements ControlValueAccessor {
  @Input() value: any;

  private _checked: boolean = false;
  private model: any;

  constructor() { }

  public writeValue(value: any): void {
    this.model = value;
    this._checked = (this.model === this.value);
  }

  public registerOnChange(fn: (value: any) => {}): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: () => any): void {
    this.onModelTouched = fn;
  }

  /** Callback via registerOnTouched */
  private onModelTouched: () => any = () => { };

  /** Callback via registerOnChange */
  private onModelChange: (value: any) => any = (value: any) => { };

}
