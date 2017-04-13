import { Component, Input, Output, ElementRef, Renderer, EventEmitter, forwardRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { coerceBoolean, setUid } from '../util';

/** Register ControlValueAccessor to support [(ngModel)] and ngControl */
export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UICheckbox),
  multi: true
};

/**
 * @export
 * @class UICheckbox
 * @implements {ControlValueAccessor}
 */
@Component({
  selector: 'ui-checkbox',
  templateUrl: 'checkbox.html',
  providers: [CHECKBOX_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./checkbox.scss'],
  host: {
    '[attr.id]': 'id',
    '[class.ui-checkbox]': 'true'
  }
})

export class UICheckbox implements ControlValueAccessor {
  /** The input checkbox's id attribute */
  @Input() id: string = setUid('ui-checkbox');

  /** The input checkbox's name attribute */
  @Input() name: string = null;

  /** The input checkbox's disabled attribute */
  @Input() disabled: boolean;

  /** The input checkbox's value attribute */
  @Input() value: any;

  /** Label be `left` or `right` */
  @Input() labelAlign: string;

  /** Whether to disable ripple effect */
  @Input() rippleDisabled: boolean = false;

  /** Emit onChange event if checkbox's value has been changed */
  @Output() onChange: EventEmitter<any> = new EventEmitter();

  /** Whether the radio is checked or not  */
  private _checked: boolean = false;

  /** model value for ngModel */
  private model: Array<any>;

  /**
   * Creates an instance of UICheckbox.
   * @param {ElementRef} elementRef
   * @param {Renderer} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  /**
   * ID of input checkbox
   */
  @Input() get checkboxID(): string { return `checkbox-${this.id}`; }

  /**
   * Whether the checkbox is checked or not
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
  public writeValue(model: any): void {
    this.model = model;
    this._checked = this.findValueIndex(this.value) !== -1;
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
  public registerOnTouched(fn: () => {}): void {
    this.onModelTouched = fn;
  }

  /**
   * Radio input change event
   * @param {Event} event
   */
  public _onChange(event: Event): void {
    this._checked = (<HTMLInputElement>event.target).checked;
    this.updateModel();
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
   * Update selected value in model
   * @private
   */
  private updateModel(): void {
    this.model && this._checked ? this.addValue(this.value) : this.removeValue(this.value);
    this.onModelChange(this.model);
    this.onChange.emit(this._checked);
  }

  /** Add selected value from model
   * @private
   * @param {*} value - checkbox's value
   */
  private addValue(value: any): void {
    this.model.push(value);
  }

  /**
   * Remove selected value from model
   * @private
   * @param {*} value - checkbox's value
   */
  private removeValue(value: any): void {
    const index = this.findValueIndex(value);
    index >= 0 && this.model.splice(index, 1);
  }

  /**
   * Find the index of selected value from model, for the use of push or splice
   * @private
   * @param {*} value - checkbox's value
   * @returns {number} - the index of checkbox's value from model
   */
  private findValueIndex(value: any): number {
    let index: number;
    return this.model ? index = this.model.findIndex((item: any) => item === value) : -1;
  }

  /**
   * Return element to ripple so that ripple knows which radio to use effect
   * @returns {HTMLElement}
   */
  private getRippleElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Change the color of radio according to properties color
   * @param {string} value - color name
   * @param {boolean} isAdd - new class to tag
   */
  private setCheckboxColor(value: string, isAdd: boolean): void {
    this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
  }
}
