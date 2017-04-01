import { Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';

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
  @Input('isRoundRipple') isRoundRipple: boolean;

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
   * @memberOf UIRipple
   */
  constructor(elementRef: ElementRef) {
    this.rippleContainer = elementRef.nativeElement;
    this.eventHandlers.set('mousedown', this.handleMouseDown.bind(this));
    this.eventHandlers.set('mouseup', this.handleMouseUp.bind(this));
    this.eventHandlers.set('mouseleave', this.handleMouseLeave.bind(this));
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
      this.eventHandlers.forEach((eventHandler, eventName) => element.addEventListener(eventName, eventHandler));
    }
    // at last set trigger element to be param element
    this.triggerElement = element;
  }


  /**
   * Create ripple and appended to DOM
   * @private
   * @param {number} pageX - element event's pageX
   * @param {number} pageY - element event's pageY
   */
  private cerateRipple(pageX: number, pageY: number) {
    const rippleElement = document.createElement('div');
    rippleElement.classList.add('ripple');
    this.rippleContainer.appendChild(rippleElement);
    this.rippleElement = rippleElement;

    // get ripple size and ripple position according to the trigger element
    // circle ripple has no need to set size and position
    if (!this.isRoundRipple) {
      const rippleSize = Math.max(this.triggerElement.offsetWidth, this.triggerElement.offsetHeight);
      const ripplePositionTop = this.triggerElement.offsetTop;
      const ripplePositionLeft = this.triggerElement.offsetLeft;

      const rippleY = pageY - ripplePositionTop - rippleSize / 2;
      const rippleX = pageX - ripplePositionLeft - rippleSize / 2;

      rippleElement.style.width = `${rippleSize}px`;
      rippleElement.style.height = `${rippleSize}px`;
      rippleElement.style.top = `${rippleY}px`;
      rippleElement.style.left = `${rippleX}px`;
    }

    // set dark ripple effect
    this.isDark && rippleElement.classList.add(`ripple-dark`);
    // activate ripple animation
    rippleElement.classList.add('active');
  }

  /**
   * Listener mousedown event
   * @private
   * @param {MouseEvent} event
   */
  private handleMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.cerateRipple(event.pageX, event.pageY);
  }

  /**
   * Listener mouseup event
   * @private
   * @param {MouseEvent} event
   */
  private handleMouseUp(event: MouseEvent): void {
    this.isMouseDown = false;
    this.triggerElement && this.rippleRemove();
  }

  /**
  * Listener mouseleave event
  * @private
  * @param {MouseEvent} event
  */
  private handleMouseLeave(event: MouseEvent) {
    this.isMouseDown && this.handleMouseUp(event);
  }

  /**
   * Remove ripple from DOM
   * @private
   */
  private rippleRemove(): void {
    // transitionend has multi propertyName, so choose one to activate dom remove action
    if (this.rippleElement) {
      this.rippleElement.addEventListener('transitionend', (event: TransitionEvent) => {
        event.propertyName === 'transform' && this.rippleElement.parentNode.removeChild(this.rippleElement);
      });
    }
  }
}
