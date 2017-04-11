import { Component, Input, Output, ElementRef, Renderer, EventEmitter, forwardRef, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBoolean, setUid } from '../util';

/** Register ControlValueAccessor to support [(ngModel)] and ngControl */
export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UIRadio),
  multi: true
};

/**
 * @export
 * @class UIRadio
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'ui-radio',
  templateUrl: 'radio.html',
  providers: [RADIO_VALUE_ACCESSOR],
  styleUrls: ['./radio.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'id',
    '[class.ui-radio]': 'true'
  }
})

export class UIRadio implements ControlValueAccessor {
  /** The input radio's id attribute */
  @Input() id: string = setUid('ui-radio');

  /** The input radio's name attribute */
  @Input() name: string = null;

  /** The input radio's disabled attribute */
  @Input() disabled: boolean;

  /** The input radio's value attribute */
  @Input() value: any;

  /** Label be `left` or `right` */
  @Input() labelAlign: string;

  /** Whether to disable ripple effect */
  @Input() rippleDisabled: boolean = false;

  /** Emit onChange event if radio's value has been changed */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  /** Whether the radio is checked or not  */
  private _checked: boolean = false;

  /** model value for ngModel */
  private model: any;

  /**
   * Creates an instance of UIRadio.
   * @param {ElementRef} elementRef
   * @param {Renderer} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  /**
   * ID of input radio
   */
  @Input() get inputID(): string { return `radio-${this.id}`; }

  /**
   * Whether the radio is checked or not
   */
  @Input()
  set checked(value: boolean) { this._checked !== coerceBoolean(value) && (this._checked = coerceBoolean(value)); }

  /**
   * `color` The color of radio
   * it can be `primary`, `green`, `red`, `blue`, `orange`
   * `brown`, `purple`, `pink`, `cyan`, `teal`, `indigo`
   */
  @Input()
  set color(value: string) { value && this.setCheckboxColor(value, true); }

  /**
   * If value changed, update model and checked status
   * parts of ControlValueAccessor
   * @param {*} model - [ngModel]
   */
  public writeValue(value: any): void {
    this.model = value;
    this._checked = (this.model === this.value);
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
  public _onChange(event: Event):void {
    event.stopPropagation();
    this._checked = true;
    this.onModelChange(this.value);

    // emit event with selected value
    const emitValue: any = {
      value: this.value
    };
    this.onChange.emit(emitValue);
  }

  /**
   * Handle radio click
   * @param {Event} event
   */
  public _onClick(event: Event):void {
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

  /**
   * Change the color of radio according to properties color
   * @param {string} value - color name
   * @param {boolean} isAdd - new class to tag
   */
  private setCheckboxColor(value: string, isAdd: boolean):void {
    this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
  }
}
