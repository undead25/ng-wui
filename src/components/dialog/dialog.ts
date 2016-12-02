import {
  Component,
  Input,
  Output,
  ElementRef,
  Renderer,
  NgModule,
  HostListener,
  ModuleWithProviders,
  EventEmitter
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import { CommonModule } from '@angular/common';
import { coerceBoolean } from '../util';
import { UIButtonModule } from '../button';
import { UIOverlay, OVERLAY_PROVIDERS } from '../overlay';

@Component({
  selector: 'ui-dialog',
  templateUrl: './dialog.html'
})

export class UIDialog {

  // 是否已经打开
  public _open: boolean = false;

  // 是否有title
  public _hasTitle: boolean = true;
  // title文字内容
  public _titleText: string;

  // 是否有顶部toolbar (适用于modal)
  public _hasToolbar: boolean = false;
  // toolbar文字内容
  public _toolbarText: string;

  // 是否内容可以scroll (适用于modal)
  public _scroll: boolean = false;

  // 是否启用esc键关闭
  public _escHide: boolean = true;

  // 是否为alert框
  public _isAlert: boolean = false;

  // 点击取消按钮后回调
  @Output() onCancelClose: EventEmitter<any> = new EventEmitter();
  // 点击确定按钮后回调
  @Output() onOkClose: EventEmitter<any> = new EventEmitter();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private _overlay: UIOverlay) { }


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
  set alert(value:boolean) {
    if (coerceBoolean(value) === this._isAlert) return;
    this._isAlert = coerceBoolean(value);
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
  onOk() {
    if (this._open) {
      this.setDialogClose();
      this.onOkClose.emit();
    }
  }

  // 显示弹出框
  setDialogOpen() {
    this._overlay.create();
    document.body.classList.add('overflow');
  }

  // 关闭弹出框 
  setDialogClose() {
    document.body.classList.remove('overflow');
    setTimeout(this._overlay.remove(), 1);
    this._open = false;
  }

  // 绑定esc keydown事件
  ngAfterViewInit() {
    if (this._escHide) {
      this.renderer.listenGlobal('document', 'keydown', (event: KeyboardEvent) => {
        if (event.which == 27) {
          this.onCancel(event);
        }
      })
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
      providers: [OVERLAY_PROVIDERS]
    };
  }
}
