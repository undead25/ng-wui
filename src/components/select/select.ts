import {
  Component,
  Input,
  Output,
  ContentChildren,
  QueryList,
  ElementRef,
  Renderer,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  NgModule,
  ModuleWithProviders,
  AfterContentInit
} from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { UISelectOption } from './option';
import { Overlay, OverlayRef } from '../overlay';
import { coerceBoolean } from '../util';
import './select.scss';

@Component({
  selector: 'ui-select',
  templateUrl: 'select.html'
})
export class UISelect implements AfterContentInit {
  public isPanelOpen: boolean = false;
  /** label 入参，标签文字 */
  @Input() label: string = '';

  @Input()
  set multiple(value: any) {
    this.isMultiple = coerceBoolean(value);
  }

  @ViewChild('optionPanel') optionPanel: TemplateRef<any>;
  @ContentChildren(UISelectOption) options: QueryList<UISelectOption>;

  private selected: Array<UISelectOption> = [];
  private nativeElement: HTMLElement;
  private overlayRef: OverlayRef;
  private _changeSubscription: Subscription;
  private isMultiple: boolean = false;

  constructor(
    public overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {
    this.nativeElement = this.elementRef.nativeElement;
  }

  /**
   * 展示选项面板
   */
  public open(): void {
    let viewRef = this.viewContainerRef.createEmbeddedView(this.optionPanel);
    this.overlayRef = this.overlay.create();
    let overlayElement: HTMLElement = this.overlayRef.createOverlay(true);
    viewRef.rootNodes.forEach(rootNode => overlayElement.appendChild(rootNode));
    this.isPanelOpen = true;
    this.overlayRef.backdropClick().first().subscribe(() => {
      this.close();
    });
  }

  /**
   * 关闭并移除选项面板
   */
  public close(): void {
    if (this.isPanelOpen) {
      this.isPanelOpen = false;
      setTimeout(() => { this.overlayRef.removeOverlay(); }, 500);
    }
  }

  /**
   * 根据组件位置设置选项面板位置
   * @returns {Object} - 返回样式对象
   */
  public setPanelStyles(): Object {
    const boundingClientRect: ClientRect = this.nativeElement.getBoundingClientRect();

    let styles = {
      'top': boundingClientRect.top + 'px',
      'left': boundingClientRect.left + 'px',
      'width': boundingClientRect.width + 'px'
    };
    return styles;
  }

  public ngAfterContentInit(): void {
    this.updateOptions();
  }

  public updateOptions(): void {
    this.options.forEach((option: UISelectOption) => {
      option.onSelect.subscribe((item: UISelectOption) => {
        if (this.isMultiple) {
          let idx = this.selected.indexOf(item);
          idx < 0 ? this.selected.push(item) : this.selected.slice(idx, 1);
        } else {
          this.selected[0] = item;
          this.close();
        }
      });
    });
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [UISelect, UISelectOption],
  declarations: [UISelect, UISelectOption],
  providers: [Overlay],
})

export class UISelectModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UISelectModule,
      providers: [Overlay]
    };
  }
}
