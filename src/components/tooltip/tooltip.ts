import {
  Directive,
  Component,
  ViewChild,
  trigger,
  style,
  state,
  transition,
  animate,
  AnimationTransitionEvent,
  Input,
  ElementRef,
  NgModule,
  ModuleWithProviders,
  ViewContainerRef,
  EmbeddedViewRef,
  ComponentFactory,
  ComponentFactoryResolver,
  NgZone,
  ComponentRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Overlay } from '../overlay';
import { getOuterWidth, getOuterHeight } from '../util';
import 'rxjs/add/operator/first';

@Directive({
  selector: '[ui-tooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(mouseleave)': 'hide()'
  },
  providers: [Overlay]
})

export class UITooltip implements OnDestroy {
  public _message: string;
  public _position: string = 'bottom';

  public overlayElement: HTMLElement;
  public tooltipElement: HTMLElement;

  private tooltip: TooltipComponent;
  private tooltipFactory: ComponentFactory<TooltipComponent>;
  private componentRef: ComponentRef<TooltipComponent>;

  @Input('ui-tooltip')
  get message() { return this._message; }
  set message(value: string) {
    this._message = value;
    if (this.tooltip) this.tooltip.message = value;
  }

  @Input('tooltip-position')
  get position() { return this._position; }
  set position(value) { this._position = value; }

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    private overlay: Overlay
  ) {
    this.tooltipFactory = componentFactoryResolver.resolveComponentFactory(TooltipComponent);
  }

  ngOnDestroy() {
    this.tooltip && this.dispose();
  }

  /**
   * @description 显示提示框
   */
  public show() {
    if (!this._message || !this._message.trim()) return;
    if (!this.tooltip) {
      this.create();
      this.tooltip._visibility = 'visible';
    }
  }

  /**
   * @description 隐藏提示框
   */
  public hide() {
    if (!this.tooltip) return;
    this.tooltip._visibility = 'hidden';
    this.tooltip.afterHide().subscribe(() => {
      this.dispose();
    });
  }

  /**
   * @description 创建提示框
   */
  private create() {
    this.overlayElement = this.overlay.create();

    this.componentRef = this.viewContainerRef.createComponent(this.tooltipFactory);
    this.overlayElement.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement);

    this.tooltip = this.componentRef.instance;
    this.tooltipElement = this.tooltip.containerViewChild.nativeElement;
    this.tooltip.message = this._message;

    this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
      this.getPosition(this.tooltipElement);
    });
  }

  private dispose() {
    this.componentRef.destroy();
    this.overlay.remove();
    this.overlayElement = null;
    this.tooltip = null;
  }

  /**
   * @description 根据触发元素位置设置提示框位置
   * @param {HTMLElement} tooltip 工具提示
   */
  private getPosition(tooltip: HTMLElement) {
    const _target = this.elementRef.nativeElement;
    const _tooltip = tooltip;

    const targetTop = _target.offsetTop;
    const targetLeft = _target.offsetLeft;

    const targetWidth = getOuterWidth(_target);
    const targetHeight = getOuterHeight(_target);

    const tooltipWidth = getOuterWidth(_tooltip, true);
    const tooltipHeight = getOuterHeight(_tooltip, true);

    let top: number;
    let left: number;

    switch (this._position) {
      case 'left':
        top = targetTop + (targetHeight - tooltipHeight) / 2;
        left = targetLeft - tooltipWidth;
        this.tooltip.transformOrigin = 'right';
        break;
      case 'right':
        top = targetTop + (targetHeight - tooltipHeight) / 2;
        left = targetLeft + targetWidth;
        this.tooltip.transformOrigin = 'left';
        break;
      case 'top':
        top = targetTop - tooltipHeight;
        left = targetLeft + (targetWidth - tooltipWidth) / 2;
        this.tooltip.transformOrigin = 'bottom';
        break;
      default:
        top = targetTop + targetHeight;
        left = targetLeft + (targetWidth - tooltipWidth) / 2;
    }

    _tooltip.style.top = `${top}px`;
    _tooltip.style.left = `${left}px`;
  }

}

@Component({
  selector: 'ui-tooltip',
  templateUrl: 'tooltip.html',
  animations: [
    trigger('state', [
      state('void', style({ transform: 'scale(0)' })),
      state('initial', style({ transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      state('hidden', style({ transform: 'scale(0)' })),
      transition('* => visible', animate('150ms cubic-bezier(0.0, 0.0, 0.2, 1)')),
      transition('* => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)')),
    ])
  ]
})

export class TooltipComponent {
  public message: string;
  public _visibility: string = 'initial';
  public transformOrigin = 'top';
  public container: any;
  public onHide: Subject<any> = new Subject();

  @ViewChild('tooltip') containerViewChild: ElementRef;

  /**
   * @description 在消失动画结束后提供可观察对象
   * @returns {Observable<void>}
   */
  public afterHide(): Observable<void> {
    return this.onHide.asObservable();
  }

  /**
   * @description 消失动画结束后
   * @param {AnimationTransitionEvent} event
   * @returns {void}
   */
  public animationDone(event: AnimationTransitionEvent): void {
    if (event.toState === 'hidden' && this._visibility !== 'visible')
      return this.onHide.next();
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [UITooltip, TooltipComponent],
  declarations: [UITooltip, TooltipComponent],
  entryComponents: [TooltipComponent]
})

export class UITooltipModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UITooltipModule,
    };
  }
}
