import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, NgZone } from '@angular/core';

/**
 * Directive Ripple
 * @export
 * @class UIRipple
 * @implements {OnDestroy}
 * @implements {OnChanges}
 */
@Directive({
  selector: '[ui-ripple]'
})

export class UIRipple implements OnDestroy, OnChanges {

  /** Which element bind ripple effect */
  @Input('trigger') trigger: HTMLElement;

  /** Whether use dark ripple effect */
  @Input('isDark') isDark: boolean;

  /** Whether use round ripple effect */
  @Input('isCircleRipple') isCircleRipple: boolean = false;

  /** Ripple's container HTMLElement */
  private rippleContainer: HTMLElement;

  /** Which element bind ripple effect, it can be a button */
  private triggerElement: HTMLElement;

  /** Ripple's DOM which will be appended */
  private rippleElement: HTMLElement;

  /** Whether mouse is down or not */
  private isMouseDown: boolean = false;

  /** Maps of events to be delegated */
  private eventHandlers = new Map<string, (e: Event) => void>();

  /**
   * Creates an instance of UIRipple.
   * @param {ElementRef} elementRef
   * @param {NgZone} ngZone
   */

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.rippleContainer = elementRef.nativeElement;
    this.eventHandlers.set('mousedown', this.onMouseDown.bind(this));
    this.eventHandlers.set('mouseup', this.onMouseUp.bind(this));
    this.eventHandlers.set('mouseleave', this.onMouseLeave.bind(this));
  }

  /**
   * When component destroyed, set trigger element to be null
   */
  public ngOnDestroy(): void {
    this.setTriggerElement(null);
  }

  /**
   * Detect input properties changes, set trigger element
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['trigger'] && this.trigger) {
      this.setTriggerElement(this.trigger);
    }
  }

  /**
   * Bind event to element who wants ripple effect
   * @private
   * @param {HTMLElement} element - Which element bind ripple effect
   */
  private setTriggerElement(element: HTMLElement): void {
    // first remove all event listener of trigger element
    if (this.triggerElement) {
      this.eventHandlers.forEach((eventHandler, eventName) => this.triggerElement.removeEventListener(eventName, eventHandler));
    }
    // then add event listener of trigger element
    if (element) {
      this.ngZone.runOutsideAngular(() => {
        this.eventHandlers.forEach((eventHandler, eventName) => element.addEventListener(eventName, eventHandler));
      });
    }
    // at last set trigger element to be param element
    this.triggerElement = element;
  }

  /**
   * Create ripple and appended to DOM
   * @private
   * @param {Event} event
   */
  private cerateRipple(event: Event) {
    const rippleElement = document.createElement('div');
    rippleElement.classList.add('ripple');
    this.rippleContainer.appendChild(rippleElement);
    this.rippleElement = rippleElement;
    const rippleSize = Math.max(this.triggerElement.offsetWidth, this.triggerElement.offsetHeight);
    // get ripple size and ripple position according to the trigger element
    if (!this.isCircleRipple) {
      const ripplePosition = this.setRipplePosition(event);
      rippleElement.style.width = ripplePosition.rippleSize + 'px';
      rippleElement.style.height = ripplePosition.rippleSize + 'px';
      rippleElement.style.top = ripplePosition.rippleTop + 'px';
      rippleElement.style.left = ripplePosition.rippleLeft + 'px';
    }
    // set dark ripple effect
    this.isDark && rippleElement.classList.add(`ripple-dark`);
    // activate ripple animation
    rippleElement.classList.add('active');
  }

  /**
   * Set ripple's size and position
   * @private
   * @param {Event} event
   * @returns {{rippleSize, rippleLeft, rippleTop}}
   */
  private setRipplePosition(event: Event): {rippleSize, rippleLeft, rippleTop} {
    const isTouchEvent = (event as TouchEvent).touches && (event as TouchEvent).touches.length;
    const pageX = isTouchEvent ? (event as TouchEvent).touches[0].pageX : (event as MouseEvent).pageX;
    const pageY = isTouchEvent ? (event as TouchEvent).touches[0].pageY : (event as MouseEvent).pageY;
    const pointerX = pageX - this.offset(this.rippleContainer).left;
    const pointerY = pageY - this.offset(this.rippleContainer).top;
    const topLeftDiag = this.calcDiag(pointerX, pointerY);
    const topRightDiag = this.calcDiag(this.rippleContainer.offsetWidth - pointerX, pointerY);
    const botRightDiag = this.calcDiag(this.rippleContainer.offsetWidth - pointerX, this.rippleContainer.offsetLeft - pointerY);
    const botLeftDiag = this.calcDiag(pointerX, this.rippleContainer.offsetLeft - pointerY);
    const rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag);
    const rippleSize = rippleRadius * 2;
    const rippleLeft = pointerX - rippleRadius;
    const rippleTop = pointerY - rippleRadius;

    return {
      rippleSize,
      rippleLeft,
      rippleTop
    };
  }

  private offset(el: HTMLElement): { top, left } {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  }

  private calcDiag(a: number, b: number) {
    return Math.sqrt((a * a) + (b * b));
  }

  /**
   * Listener mousedown event
   * @private
   * @param {MouseEvent} event
   */
  private onMouseDown(event: Event): void {
    this.isMouseDown = true;
    this.cerateRipple(event);
  }

  /**
   * Listener mouseup event
   * @private
   * @param {MouseEvent} event
   */
  private onMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    this.triggerElement && this.rippleRemove();
  }

  /**
  * Listener mouseleave event
  * @private
  * @param {MouseEvent} event
  */
  private onMouseLeave(event: MouseEvent) {
    this.isMouseDown && this.onMouseUp(event);
  }

  /**
   * Remove ripple from DOM
   * @private
   */
  private rippleRemove(): void {
    // cache ripple element if this.rippleElement changed
    const rippleElement = this.rippleElement;

    if (rippleElement) {
      setTimeout(() => {
        rippleElement.classList.add('fade');

        // transitionend has multi propertyName, so choose one to activate dom remove action
        rippleElement.addEventListener('transitionend', (event: TransitionEvent) => {
          if (event.propertyName === 'opacity' && rippleElement) {
            rippleElement.parentNode.removeChild(rippleElement);
          }
        });
      }, 0);
    }
  }
}
