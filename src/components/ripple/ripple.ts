import { NgModule, ModuleWithProviders, Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { getOffset } from '../util';

@Directive({
  selector: '[ui-ripple]'
})

export class UIRipple implements OnInit, OnDestroy, OnChanges {
  @Input('ripple-trigger') trigger: HTMLElement;
  @Input('ripple-dark') isDark: boolean;

  public rippleElement: HTMLElement;
  public triggerElement: HTMLElement;
  public rippleDiv: HTMLElement;
  public eventHandlers = new Map<string, (e: Event) => void>();
  
  constructor(elementRef: ElementRef) {
    this.rippleElement = elementRef.nativeElement;
    this.eventHandlers.set('click', (event: MouseEvent) => {
      this.handleClick(event);
    })
  }

  ngOnInit() {
    if (!this.trigger) this.setTriggerElement(this.rippleElement);
  }

  ngOnDestroy() {
    this.rippleDestroy();
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const changedInputs = Object.keys(changes);
    if (changedInputs.indexOf('trigger') !== -1) {
      this.setTriggerElement(this.trigger);
    }
  }
  
  // 设置需要triggleElement的事件绑定或者移除
  private setTriggerElement(newTrigger: HTMLElement) {
    if (this.triggerElement !== newTrigger) {
      if (this.triggerElement) {
        this.eventHandlers.forEach((eventHandler, eventName) => {
          this.triggerElement.removeEventListener(eventName, eventHandler);
        });
      }
      this.triggerElement = newTrigger;
      if (this.triggerElement) {
        this.eventHandlers.forEach((eventHandler, eventName) => {
          this.triggerElement.addEventListener(eventName, eventHandler);
        });
      }
    }
  }
  
  // 鼠标点击事件
  private handleClick(event: MouseEvent) {
    // 创建ripple HTML 并根据点击目标设置其位置和大小
    const rippleDiv = document.createElement('div');
    rippleDiv.classList.add('ripple');
    this.rippleElement.appendChild(rippleDiv);
    
    const size = Math.max(this.triggerElement.offsetWidth, this.triggerElement.offsetHeight);
    const rippleTop = getOffset(rippleDiv).top;
    const rippleLeft = getOffset(rippleDiv).left;
    const rippleY = event.pageY - rippleTop -size/2;
    const rippleX = event.pageX - rippleLeft - size/2;

    rippleDiv.style.width = `${size}px`;
    rippleDiv.style.height = `${size}px`;
    rippleDiv.style.top = `${rippleY}px`;
    rippleDiv.style.left = `${rippleX}px`;

    if (this.isDark) rippleDiv.classList.add(`ripple-dark`);    
    rippleDiv.classList.add('active');
    this.rippleRemove(rippleDiv);
  }
  
  // 移除ripple
  private rippleRemove(rippleDiv: Element) {
    // 注意transitionend有多个属性
    rippleDiv.addEventListener('transitionend', (event: TransitionEvent) => {
      if (rippleDiv && event.propertyName === 'opacity') rippleDiv.parentNode.removeChild(rippleDiv);
    })
  }

  // 销毁ripple
  rippleDestroy() {
    this.setTriggerElement(null);
  }
}

@NgModule({
  exports: [UIRipple],
  declarations: [UIRipple],
})
export class UIRippleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIRippleModule,
      providers: []
    };
  }
}