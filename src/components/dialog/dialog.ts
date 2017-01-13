import {
  Component,
  Input,
  Output,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders,
  EventEmitter,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBoolean } from '../util';
import { UIButtonModule } from '../button';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.html'
})

export class UIDialog implements AfterViewInit {

  // 是否已经打开
  public _open: boolean = false;

  // 是否有title
  public _hasTitle: boolean;
  // title文字内容
  public _titleText: string;

  public _okLabel: string = '确定';
  public _cancelLabel: string = '取消';

  // 是否有顶部toolbar (适用于modal)
  public _hasToolbar: boolean = false;
  // toolbar文字内容
  public _toolbarText: string;

  // 是否内容可以scroll
  public _scroll: boolean = false;

  // 是否启用esc键关闭
  public _escHide: boolean = true;

  // 是否为alert框
  public _isAlert: boolean = false;

  public _backdropClose: boolean = true;

  public _isOkDisabled: boolean = false;

  // 点击取消按钮后回调
  @Output() onCancelClose: EventEmitter<any> = new EventEmitter();
  // 点击确定按钮后回调
  @Output() onOkClose: EventEmitter<any> = new EventEmitter();

  @ViewChild('container') containerViewChild: ElementRef;
  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  @Input()
  get open() {
    return this._open;
  }
  set open(value: boolean) {
    if (coerceBoolean(value) === this._open) return;
    this._open = coerceBoolean(value);

    if (this._open) {
      this.setDialogOpen();
    }
  }

  @Input()
  get header() {
    return this._titleText;
  }
  set header(value: string) {
    if (value) {
      this._hasTitle = true;
      this._titleText = value;
    }
  }

  @Input()
  set toolbar(value: string) {
    if (value) {
      this._hasToolbar = true;
      this._toolbarText = value;
    }
  }

  @Input()
  get scroll() {
    return this._scroll;
  }
  set scroll(value: boolean) {
    if (coerceBoolean(value) === this._scroll) return;
    this._scroll = coerceBoolean(value);
  }

  @Input()
  get esc() {
    return this._escHide;
  }
  set esc(value: boolean) {
    if (coerceBoolean(value) === this._escHide) return;
    this._escHide = coerceBoolean(value);
  }

  @Input()
  get alert() {
    return this._isAlert;
  }
  set alert(value: boolean) {
    if (coerceBoolean(value) === this._isAlert) return;
    this._isAlert = coerceBoolean(value);
  }

  @Input()
  set backdropClose(value: boolean) {
    if (coerceBoolean(value) === this._backdropClose) return;
    this._backdropClose = coerceBoolean(value);
  }

  @Input()
  set okLabel(value: string) {
    this._okLabel = value;
  }

  @Input()
  set isOkDisabled(value: boolean) {
    if (coerceBoolean(value) === this._isOkDisabled) return;
    this._isOkDisabled = coerceBoolean(value);
  }

  hasTitle() {
    return this._hasTitle;
  }

  hasToolbar() {
    return this._hasToolbar;
  }

  isAlert() {
    return this._isAlert;
  }

  // 点击取消按钮，且绑定esc键事件
  onCancel(e?: Event) {
    if (e) e.stopPropagation();

    if (this._open) {
      this.setDialogClose();
      this.onCancelClose.emit();
    }
  }

  // 点击确定按钮
  public onOk() {
    if (this._open) {
      this.setDialogClose();
      this.onOkClose.emit();
    }
  }

  // 显示弹出框
  setDialogOpen() {
    document.body.classList.add('overflow');
  }

  // 关闭弹出框 
  setDialogClose() {
    document.body.classList.remove('overflow');
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this._backdropClose) return;
    if(event.target === this.containerViewChild.nativeElement) {
      this._isAlert ? this.onOk() : this.onCancel();
    }
  }

  // 绑定esc keydown事件
  ngAfterViewInit() {
    if (this._escHide) {
      this.renderer.listenGlobal('document', 'keydown', (event: KeyboardEvent) => {
        if (event.which === 27) {
          this.onCancel(event);
        }
      });
    }
  }
}

@NgModule({
  imports: [CommonModule, UIButtonModule],
  exports: [UIDialog],
  declarations: [UIDialog],
  providers: [],
})
export class UIDialogModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIDialogModule,
    };
  }
}
