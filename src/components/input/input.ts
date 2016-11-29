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
  Renderer
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaAutosize } from './autosize';
import { coerceBoolean, setUid } from '../util';

@Component({
  selector: 'ui-input, ui-textarea',
  templateUrl: 'input.html'
})

export class UIInput {
  // placeholder 属性值
  private _placeholder: string = null;
  // value 属性值
  private _value: string = null;
  // label 文字
  private labelText: string = null;

  // 是否只读
  private _readonly: boolean = false;
  // 是否禁用
  private _disabled: boolean = false;
  // 是否为必须项
  private _required: boolean = false;
  // 是否自动focus
  private _autofocus: boolean = false;
  // 是否focus
  private _focused: boolean = false;
  // 是否有label
  private _hasLabel: boolean = false;
  // 是否有placeholder
  private _hasPlaceholder: boolean = false;
  // 是否激活placeholder, 激活即隐藏
  private _isPlaceholderActive: boolean = false;

  private inputType: 'input' | 'textarea';
  constructor(private elementRef: ElementRef, private renderer: Renderer) {
    this.inputType = elementRef.nativeElement.nodeName.toLowerCase() === 'ui-input' ? 'input' : 'textarea';
  }

  @Input() id: string = setUid('uiInput');
  @Input() name: string = null;
  @Input() type: string = 'text';
  // 错误文字
  @Input() error: string = '';
  // 帮助文字
  @Input() help: string = '';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    if (value) {
      this._placeholder = value;
      this._hasPlaceholder = true;
    }
  }

  @Input()
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    if (v !== this._value) this._value = v;
  }

  @Input()
  get label(): string {
    return this.labelText;
  }
  set label(value: string) {
    if (value) {
      this.labelText = value;
      this._hasLabel = true;
    }
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBoolean(value);
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBoolean(value);
  }

  @Input()
  get readonly() {
    return this._readonly;
  }
  set readonly(value) {
    this._readonly = coerceBoolean(value);
  }

  // only textarea
  @Input() rows: number = null;
  @Input() cols: number = null;

  @Output() onBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() onFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

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
  }

  // keyup事件
  handleKeyup(event: KeyboardEvent) {
    const _value = (<HTMLInputElement>event.target).value;
    _value.length > 0 ? this._isPlaceholderActive = true : this._isPlaceholderActive = false;
  }

  // 是否需要激活label
  isLabelActive() {
    return this._value ? true : this._focused;
  }

  // 让既有label又有placeholder的input隐藏placeholder
  ngAfterContentInit() {
    if (this._hasLabel && this._hasPlaceholder) this._isPlaceholderActive = true;
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [UIInput, TextareaAutosize],
  declarations: [UIInput, TextareaAutosize]
})
export class UIInputModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIInputModule
    };
  }
}
