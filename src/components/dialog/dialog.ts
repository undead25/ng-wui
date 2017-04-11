import {
  Component,
  ElementRef,
  Input,
  NgModule,
  ModuleWithProviders,
  AfterViewInit,
  Injectable,
  ComponentRef,
  Renderer,
  ViewEncapsulation
} from '@angular/core';
import {
  animate,
  trigger,
  state,
  style,
  transition,
  AnimationEvent,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { merge, InjectionService, coerceBoolean } from '../util';
import { UIButtonModule } from '../button';
import { Overlay } from '../overlay';
import { Observable } from 'rxjs/Observable';

/**
 * 弹框配置类
 * @export
 * @class DialogConfig
 */
export class DialogConfig {
  message?: string;
  toolbarText?: string;
  okLabel?: string = '确定';
  cancelLabel?: string = '取消';
  isModal?: boolean = false;
  isAlert?: boolean = false;
  disableOkBtn?: boolean = false;
  disableOkClose?: boolean = false;
  escClose?: boolean = true;
  disableBackdropClose?: boolean = false;
}

/**
 * 弹框服务
 * @export
 * @class Dialog
 */
@Injectable()
export class UIDialogService {
  public componentRef: ComponentRef<any>;
  public dialogComponent: any;
  public openedDialogs: any[] = [];

  /**
   * 弹框组件服务构造函数.
   * @param {Overlay} overlay
   * @param {InjectionService} injection
   */
  constructor(public overlay: Overlay, private injection: InjectionService) { }

  /**
   * 打开弹框
   * @param {DialogConfig} config - 弹框配置
   * @param {*} [component] - 需要嵌入的组件
   * @returns this.dialogComponent
   */
  public open(config: DialogConfig, component?: any) {
    !component && (component = UIDialog);
    // 合并配置参数
    config = merge(new DialogConfig(), config);
    let overlayRef = this.overlay.create(true);
    this.componentRef = this.injection.appendComponent(component, { config: config }, overlayRef.createOverlay(true, true));
    let componentInstance = this.componentRef.instance;
    config.isModal ? this.dialogComponent = componentInstance.dialogComponent : this.dialogComponent = componentInstance;
    this.dialogComponent.afterClosed().subscribe(() => {
      overlayRef.removeOverlay(true);
      this.componentRef.destroy();
    });
    this.dialogComponent.visibility = 'visible';
    if (!config.disableBackdropClose) {
      overlayRef.backdropClick().first().subscribe(() => this.dialogComponent.close());
    }
    return componentInstance;
  }
}

/**
 * Dialog 组件
 * @export
 * @class UIDialog
 */
@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.html',
  styleUrls: ['./dialog.scss'],
  animations: [
    trigger('state', [
      state('void', style({ transform: 'scale(0.2)', opacity: '0' })),
      state('initial', style({ transform: 'scale(0.2)', opacity: '0' })),
      state('visible', style({ transform: 'scale(1)', opacity: '1' })),
      state('hidden', style({ transform: 'scale(0.2)', opacity: '0' })),
      transition('* => visible', animate('.4s cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('* => hidden', animate('.4s cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ])
  ],
  encapsulation: ViewEncapsulation.None
})
export class UIDialog implements AfterViewInit {
  /** 配置参数 */
  public _config: DialogConfig;
  public visibility: string = 'initial';

  /** 配置入参 */
  @Input()
  set config(value: any) {
    this._config = value;
  }

  /** 是否禁用确定按钮 */
  @Input()
  set disableOkBtn(value: boolean) {
    this._config.disableOkBtn = coerceBoolean(value);
  }

  /** 弹框dom */
  public dialogElement: HTMLElement;
  /** 关闭后subject */
  public closed: Subject<any> = new Subject();
  /** 确定按钮subject */
  public _onOk: Subject<any> = new Subject();
  /** 取消按钮subject */
  public _onCancel: Subject<any> = new Subject();

  /**
   * 弹框组件构造函数
   * @param {ElementRef} elementRef
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  /**
   * 关闭弹框
   */
  public close(): void {
    this.visibility = 'hidden';
    this.closed.next();
    const dialogElement = this.elementRef.nativeElement;
    if (dialogElement && dialogElement.parentNode !== null) {
      document.removeEventListener('keydown');
      dialogElement.parentNode.removeChild(dialogElement);
    }
  }

  /**
   * 消失动画结束后
   * @param {AnimationEvent} event
   * @returns {void}
   */
  public animationDone(event: AnimationEvent): void {
    if (event.toState === 'hidden' && this.visibility !== 'visible')
      this.close();
  }

  /**
   * 点击确定按钮
   */
  public handleOk(): void {
    this._onOk.next();
    !this._config.disableOkClose && (this.close());
  }

  /**
   * 点击取消按钮
   */
  public handleCancel(): void {
    this._onCancel.next();
    this.close();
  }

  /**
   * 确定按钮回调
   * @returns {Observable<void>}
   */
  public onOk(): Observable<void> {
    return this._onOk.asObservable();
  }

  /**
   * 取消按钮回调
   * @returns {Observable<void>}
   */
  public onCancel(): Observable<void> {
    return this._onCancel.asObservable();
  }

  /**
   * 弹框关闭后回调
   * @returns {Observable<void>}
   */
  public afterClosed(): Observable<void> {
    return this.closed.asObservable();
  }

  // 绑定esc keydown事件
  ngAfterViewInit() {
    // 失去焦点, body聚焦
    const focusElement = (document.activeElement) as HTMLElement;
    focusElement.blur();
    if (this._config.escClose) {
      document.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.which === 27) this.handleCancel();
      });
    }
  }
}

@NgModule({
  imports: [CommonModule, UIButtonModule],
  exports: [UIDialog],
  providers: [Overlay, InjectionService],
  declarations: [UIDialog],
  entryComponents: [UIDialog]
})
export class UIDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIDialogModule,
      providers: [UIDialogService, Overlay, InjectionService]
    };
  }
}
