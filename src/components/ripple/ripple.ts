import {
  NgModule,
  ModuleWithProviders,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange
} from '@angular/core';

@Directive({
  selector: '[ui-ripple]'
})

export class UIRipple implements OnInit, OnDestroy, OnChanges {
  @Input('ripple-trigger') trigger: HTMLElement;
  @Input('ripple-dark') isDark: boolean;
  @Input('ripple-type') type: string;

  public rippleElement: HTMLElement;
  public triggerElement: HTMLElement;
  public rippleDiv: HTMLElement;
  public eventHandlers = new Map<string, (e: Event) => void>();

  constructor(elementRef: ElementRef) {
    this.rippleElement = elementRef.nativeElement;
    this.eventHandlers.set('mousedown', (event: MouseEvent) => {
      this.handleClick(event);
    });
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

  // 销毁ripple
  public rippleDestroy() {
    this.setTriggerElement(null);
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
    const rippleTop = this.triggerElement.offsetTop;
    const rippleLeft = this.triggerElement.offsetLeft;

    const rippleY = event.pageY - rippleTop - size / 2;
    const rippleX = event.pageX - rippleLeft - size / 2;

    if (this.type !== 'circle') {
      rippleDiv.style.width = `${size}px`;
      rippleDiv.style.height = `${size}px`;
      rippleDiv.style.top = `${rippleY}px`;
      rippleDiv.style.left = `${rippleX}px`;
    }

    if (this.isDark) rippleDiv.classList.add(`ripple-dark`);
    rippleDiv.classList.add('active');
    this.rippleRemove(rippleDiv);
  }

  // 移除ripple
  private rippleRemove(rippleDiv: HTMLElement) {
    // 注意transitionend有多个属性问题
    rippleDiv.addEventListener('transitionend', (event: TransitionEvent) => {
      if (rippleDiv && event.propertyName === 'opacity')
        rippleDiv.parentNode.removeChild(rippleDiv);
    });
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
