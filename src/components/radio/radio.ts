import {
  Component,
  Input,
  Output,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { coerceBoolean, setUid } from '../util';
import { UIRippleModule } from '../ripple';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UIRadio),
  multi: true
};

@Component({
  selector: 'ui-radio',
  templateUrl: 'radio.html',
  providers: [RADIO_VALUE_ACCESSOR]
})

export class UIRadio implements ControlValueAccessor {
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() value: any;
  @Input() align: string;
  @Input() rippleDisabled: boolean = false;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  // 是否选中
  public _checked: boolean = false;
  public model: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  public writeValue(model: any): void {
    this.model = model;
    this._checked = (this.model === this.value);
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  // checkbox状态变化
  public _onChange(event: Event) {
    this._checked = true;
    this.onModelChange(this.value);
  }

  private onModelChange: Function = () => { };
  private onModelTouched: Function = () => { };

  @Input()
  set checked(value: boolean) {
    this._checked = coerceBoolean(value);
  }

  @Input()
  set color(value: string) {
    if (value) this.setCheckboxColor(value, true);
  }

  // 给ripple提供HTMLElement
  private getRippleElement() {
    return this.elementRef.nativeElement;
  }

  // 根据color属性值改变按钮颜色
  private setCheckboxColor(value: string, isAdd: boolean) {
    this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
  }

}

@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UIRadio],
  declarations: [UIRadio],
  providers: [],
})

export class UIRadioModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIRadioModule,
    };
  }
}
