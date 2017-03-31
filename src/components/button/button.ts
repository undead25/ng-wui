import {
  Component,
  Input,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { coerceBoolean } from '../util';

/**
 * 按钮组件
 * @export
 * @class UIButton
 */
@Component({
  selector: 'button[ui-button]',
  templateUrl: 'button.html',
  host: {
    '[disabled]': 'disabled'
  }
})
export class UIButton {
  /** 背景色 */
  public _color: string;
  /** 是否禁用按钮 */
  public _disabled: boolean = null;
  /** 是否禁用ripple */
  public _rippleDisabled: boolean = false;

  /**
   * 按钮组件构造函数
   * @param {ElementRef} elementRef
   * @param {Renderer} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  /**
   * disabled 入参，改变按钮禁用状态
   * @readonly
   */
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (coerceBoolean(value) === this._disabled) return;
    this._disabled = coerceBoolean(value) ? true : null;
  }

  /**
   * color 入参，改变按钮背景色
   * @readonly
   */
  @Input()
  get color() {
    return this._color;
  }
  set color(value: string) {
    this.setButtonColor(value, true);
    this._color = value;
  }

  @Input()
  get rippleDisabled() {
    return this._rippleDisabled;
  }
  set rippleDisabled(value: boolean) {
    if (coerceBoolean(value) === this._rippleDisabled) return;
    this._rippleDisabled = coerceBoolean(value);
  }

  // 根据color属性值改变按钮颜色
  setButtonColor(value: string, isAdd: boolean) {
    if (value !== null && value !== '') {
      this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
    }
  }

  // 给ripple提供HTMLElement
  getRippleElement() {
    return this.elementRef.nativeElement;
  }

  // 给ripple提供背景色（深色还是浅色）
  isRippleDark() {
    const el = this.elementRef.nativeElement;
    if (!el.hasAttribute('raised')) return true;
    if (el.hasAttribute('raised') && !el.hasAttribute('color')) return true;
  }

  // 设置是否禁用ripple
  isRippleDisabled() {
    return this._rippleDisabled || this._disabled;
  }
}

@Component({
  selector: 'a[ui-button]',
  templateUrl: 'button.html',
  host: {
    '[attr.disabled]': 'disabled',
    '(click)': 'handleAnchorClick($event)'
  },
  inputs: ['color', 'disabled', 'rippleDisabled']
})

export class UIAnchorButton extends UIButton {
  constructor(elementRef: ElementRef, renderer: Renderer) {
    super(elementRef, renderer);
  }

  public handleAnchorClick(event: MouseEvent) {
    // if (this._disabled) {
    //   event.preventDefault();
    //   event.stopImmediatePropagation();
    // }
  }
}

@NgModule({
  imports: [CommonModule, UIRippleModule],
  exports: [UIButton, UIAnchorButton],
  declarations: [UIButton, UIAnchorButton],
  providers: [],
})
export class UIButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIButtonModule,
      providers: []
    };
  }
}

