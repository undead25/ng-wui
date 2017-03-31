import { Component, Input, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';

/**
 * @export
 * @class UIButton
 */
@Component({
  selector: 'button[ui-button]',
  templateUrl: 'button.html',
  host: {
    '[disabled]': 'disabled'
  },
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./button.scss']
})

export class UIButton {
  /** The Button's background */
  private _color: string;

  /** Whether the button is disabled */
  private _disabled: boolean = null;

  /** Whether use ripple effect */
  private _rippleDisabled: boolean = false;


  /**
   * Creates an instance of UIButton.
   * @param {ElementRef} elementRef
   * @param {Renderer} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  /**
   * `disabled` Whether the button is disabled
   * @readonly
   */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) { this._disabled = value; }

  /**
   * `color` The Button's background
   * it can be `primary`, `green`, `red`, `blue`, `yellow`, `orange`
   * `brown`, `purple`, `pink`, `cyan`, `teal`, `indigo`
   * @readonly
   */
  @Input()
  get color() { return this._color; }
  set color(value: string) {
    this.setButtonColor(value, true);
    this._color = value;
  }

  /**
   * `rippleDisabled` Whether use ripple effect
   * @readonly
   */
  @Input()
  get rippleDisabled() { return this._rippleDisabled; }
  set rippleDisabled(value: boolean) { this._rippleDisabled = value; }

  /**
   * Return element to ripple so that ripple knows which button to use effect
   * @returns {HTMLElement}
   */
  public getRippleElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /**
   * Setting whether ripple effect's background is dark or not
   * @returns {boolean}
   */
  public isRippleDark(): boolean {
    const el: HTMLElement = this.elementRef.nativeElement;
    return (el.hasAttribute('raised') && el.hasAttribute('color')) ? false : true;
  }

  /**
   * Setting whether to use ripple effect
   * @returns  {boolean}
   */
  public isRippleDisabled(): boolean {
    return this._rippleDisabled || this._disabled;
  }

  /**
   * Change the background of button according to properties color
   * @param {string} value - color name
   * @param {boolean} isAdd - new class to tag
   */
  private setButtonColor(value: string, isAdd: boolean) {
    if (value !== null && value !== '') {
      this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
    }
  }
}


/**
 * @export
 * @class UIAnchorButton
 * @extends {UIButton}
 */
@Component({
  selector: 'a[ui-button]',
  templateUrl: 'button.html',
  host: {
    '[attr.disabled]': 'disabled',
    '(click)': 'handleAnchorClick($event)'
  },
  encapsulation: ViewEncapsulation.None
})

export class UIAnchorButton extends UIButton {
  /**
   * Creates an instance of UIAnchorButton.
   * @param {ElementRef} elementRef
   * @param {Renderer} renderer
   */
  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer);
  }

  /**
   * Do nothing if the button is disabled
   * @param {MouseEvent} event
   */
  public handleAnchorClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}
