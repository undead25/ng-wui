import {
  Component,
  Input,
  Output,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders,
  EventEmitter,
  forwardRef,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { coerceBoolean, setUid } from '../util';
import { UIRippleModule } from '../ripple';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UICheckbox),
  multi: true
};

@Component({
  selector: 'ui-checkbox',
  templateUrl: 'checkbox.html',
  providers: [CHECKBOX_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.scss']
})

export class UICheckbox implements ControlValueAccessor {
  @Input() name: string;
  @Input() id: string = `${setUid('checkbox')}`;
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
    this._checked = this.findValueIndex(this.value) !== -1;
  }

  public registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  // checkbox状态变化
  public _onChange(event: Event) {
    this._checked = (<HTMLInputElement>event.target).checked;
    this.updateModel();
  }


  private onModelChange: Function = () => { };
  private onModelTouched: Function = () => { };

  get checkboxId(): string {
    return `checkbox-${this.id}`;
  }

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

  // 更新数据
  private updateModel() {
    if (this.model)
      this._checked ? this.addValue(this.value) : this.removeValue(this.value);
    this.onModelChange(this.model);
    this.onChange.emit(this._checked);
  }

  // 根据color属性值改变按钮颜色
  private setCheckboxColor(value: string, isAdd: boolean) {
    this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
  }

  private addValue(value: any) {
    this.model.push(value);
  }

  private removeValue(value: any) {
    const index = this.findValueIndex(value);
    if (index >= 0) {
      this.model.splice(index, 1);
    }
  }

  private findValueIndex(value: any) {
    let index: number = -1;
    if (this.model) {
      for (let i = 0; i < this.model.length; i++) {
        if (this.model[i] === value) {
          index = i;
          break;
        }
      }
    }
    return index;
  }
}

@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UICheckbox],
  declarations: [UICheckbox],
  providers: [],
})

export class UICheckboxModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UICheckboxModule,
    };
  }
}
