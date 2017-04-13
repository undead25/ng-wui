import { Component, Input, Output, forwardRef, ViewEncapsulation, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
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
    '[class.ui-switch]': 'true',
    '[class.checked]': 'checked'
  }
})

export class UISwitch implements ControlValueAccessor {
  @Input() value: any;
  @Input() label: string;
  /** The input id attribute */
  @Input() id: string = setUid('ui-switch');

  /** The input name attribute */
  @Input() name: string = null;

  /** The input disabled attribute */
  @Input() _disabled: boolean = false;

  /** Whether to disable ripple effect */
  @Input() rippleDisabled: boolean = false;

  /** Emit onChange event if switch's value has been changed */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  private _checked: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  /**
   * Whether the switch is checked or not
   */
  @Input()
  get checked() { return !!this._checked; }
  set checked(value: any) {
    if (this.checked !== !!value) {
      this._checked = value;
      this.onModelChange(this._checked);
    }
  }

  /** Whether the switch is disabled or not */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value) { this._disabled = coerceBoolean(value); }

  /** ID of hidden input */
  @Input() get inputID(): string { return `switch-${this.id}`; }

  /**
   * If value changed, update model and checked status
   * parts of ControlValueAccessor
   * @param {*} model - [ngModel]
   */
  public writeValue(value: any): void {
    this.checked = value;
  }

  /**
   * Register a callback if model value changes
   * parts of ControlValueAccessor
   * @param {(value: any) => {}} fn
   */
  public registerOnChange(fn: (value: any) => {}): void {
    this.onModelChange = fn;
  }

  /**
   * Register a callback if model value touched
   * parts of ControlValueAccessor
   * @param {(value: any) => {}} fn
   */
  public registerOnTouched(fn: () => any): void {
    this.onModelTouched = fn;
  }

  /**
   * Radio input change event
   * @param {Event} event
   */
  public _onChange(event: Event): void {
    event.stopPropagation();

    if (!this._disabled) {
      this._checked = !this._checked;
      this.onChange.emit({checked: this.checked});
    }
  }

  /**
   * Handle switch click
   * @param {Event} event
   */
  public _onClick(event: Event): void {
    event.stopPropagation(); // stop propagation, because it is an input
    this.onModelTouched(); // it has been touched
  }

  /** Callback via registerOnTouched */
  private onModelTouched: () => any = () => { };

  /** Callback via registerOnChange */
  private onModelChange: (value: any) => any = (value: any) => { };

  /**
   * Return element to ripple so that ripple knows which radio to use effect
   * @returns {HTMLElement}
   */
  private getRippleElement():HTMLElement {
    return this.elementRef.nativeElement;
  }
}
