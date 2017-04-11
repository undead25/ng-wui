import {
  Component,
  Input,
  AfterContentInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  forwardRef,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TextareaAutosize } from './autosize';
import { coerceBoolean, setUid } from '../util';

export const INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UIInput),
  multi: true
};

@Component({
  selector: 'ui-input, ui-textarea',
  templateUrl: 'input.html',
  providers: [INPUT_VALUE_ACCESSOR],
  styleUrls: ['./input.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UIInput implements ControlValueAccessor, AfterContentInit {

  // placeholder 属性值
  public _placeholder: string = null;
  // value 属性值
  public _value: string = null;
  // label 文字
  public labelText: string = null;

  // 是否只读
  public _readonly: boolean = false;
  // 是否禁用
  public _disabled: boolean = false;
  // 是否为必须项
  public _required: boolean = false;
  // 是否自动focus
  public _autofocus: boolean = false;
  // 是否focus
  public _focused: boolean = false;
  // 是否有label
  public _hasLabel: boolean = false;
  // 是否有placeholder
  public _hasPlaceholder: boolean = false;
  // 是否激活placeholder, 激活即隐藏
  public _isPlaceholderActive: boolean = false;

  public inputType: 'input' | 'textarea';


  @Input() id: string = setUid('uiInput');
  @Input() name: string = null;
  @Input() type: string = 'text';
  @Input() maxlength: number = null;
  @Input() tabindex: number = null;
  // 错误文字
  @Input() error: string = '';
  // 帮助文字
  @Input() help: string = '';

  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    if (value) {
      this._placeholder = value;
      this._hasPlaceholder = true;
    }
  }

  @Input()
  get value(): string { return this._value; }
  set value(v: string) {
    if (v !== this._value)
      this._value = v;
      this.onValueChange(v);
  }

  @Input()
  get label(): string { return this.labelText; }
  set label(value: string) {
    if (value) {
      this.labelText = value;
      this._hasLabel = true;
    }
  }

  @Input()
  get required() { return this._required; }
  set required(value: boolean) { this._required = coerceBoolean(value); }

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = coerceBoolean(value); }

  @Input()
  get readonly() { return this._readonly; }
  set readonly(value) { this._readonly = coerceBoolean(value); }

  @Input()
  get autofocus(): boolean { return this._autofocus; }
  set autofocus(value) { this._autofocus = coerceBoolean(value); }


  // only textarea
  @Input() rows: number = null;
  @Input() cols: number = null;

  @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    const _nodeName: string = elementRef.nativeElement.nodeName.toLowerCase();
    this.inputType = _nodeName === 'ui-input' ? 'input' : 'textarea';
  }

  public writeValue(value: any): void {
    this._value = value;
  }

  public registerOnChange(fn: Function): void {
    this.onValueChange = fn;
  }

  public registerOnTouched(fn: Function): void {
    this.onValueTouched = fn;
  }

  // focus事件
  handleFocus(event: FocusEvent) {
    this._focused = true;
    const _value = (<HTMLInputElement>event.target).value;
    if (this._hasPlaceholder && this._hasLabel && _value.length === 0)
      this._isPlaceholderActive = false;

    this.onFocus.emit(event);
  }

  // blur事件
  handleBlur(event: FocusEvent) {
    const _value = (<HTMLInputElement>event.target).value;
    this._focused = false;
    this.onValueTouched();
    if (this._hasLabel && this._hasPlaceholder) {
      this._isPlaceholderActive = true;
    } else if (_value.length === 0) {
      this._isPlaceholderActive = false;
    }

    this.onBlur.emit(event);
  }

  // change事件
  handleChange(event: Event) {
    this._value = (<HTMLInputElement>event.target).value;
    this.onValueTouched();
  }

  // keyup事件
  handleKeyup(event: KeyboardEvent) {
    const _value = (<HTMLInputElement>event.target).value;
    _value.length > 0 ? this._isPlaceholderActive = true : this._isPlaceholderActive = false;
    if ((event.which === 13 && this.inputType !== 'textarea') || event.which === 27)
      (<HTMLInputElement>event.target).blur();
  }

  // 是否需要激活label
  isLabelActive() {
    return this._value ? true : this._focused;
  }

  // 让既有label又有placeholder的input隐藏placeholder
  ngAfterContentInit() {
    if (this._hasLabel && this._hasPlaceholder) this._isPlaceholderActive = true;
  }
  private onValueChange: Function = () => { };
  private onValueTouched: Function = () => { };
}

