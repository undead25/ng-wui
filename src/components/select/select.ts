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
  AfterContentInit,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
// import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { UISelectOption } from './option';
import { Overlay, OverlayRef } from '../overlay';
import { coerceBoolean } from '../util';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'ui-select',
  templateUrl: 'select.html',
  styleUrls: ['./select.scss'],
  host: {
    '[class.ui-select]': 'true',
    '(click)': 'open()'
  },
  encapsulation: ViewEncapsulation.None
})
export class UISelect implements AfterContentInit, OnDestroy {
  /** Whether ths options panel is open or not */
  public isPanelOpen: boolean = false;

  /** Label text of the select */
  @Input() label: string = '';

  @Input()
  get multiple() { return this.isMultiple; }
  set multiple(value: any) { this.isMultiple = coerceBoolean(value); }

  @ViewChild('optionPanel') optionPanel: TemplateRef<any>;
  @ContentChildren(UISelectOption) options: QueryList<UISelectOption>;

  private selected: Array<UISelectOption> = [];
  private overlayRef: OverlayRef;
  private changeSubscription: Subscription;
  private optionSubscription: Subscription;

  private isMultiple: boolean = false;

  constructor(
    public overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {
  }

  /**
   * Open options panel for select
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
   * Close options panel and remove it from DOM
   */
  public close(): void {
    if (this.isPanelOpen) {
      this.isPanelOpen = false;
      setTimeout(() => { this.overlayRef.removeOverlay(); }, 500);
    }
  }

  /**
   * Sets options panel's postion & size according to the select component
   * @returns {{top: string; left: string; width: string;}}
   */
  public setPanelStyles(): { top: string; left: string; width: string; } {
    const boundingClientRect: ClientRect = this.elementRef.nativeElement.getBoundingClientRect();

    let styles = {
      top: boundingClientRect.top + 'px',
      left: boundingClientRect.left + 'px',
      width: boundingClientRect.width + 'px'
    };
    return styles;
  }

  public ngAfterContentInit(): void {
    this.changeSubscription = this.options.changes.startWith(null).subscribe(() => {
      this.resetOptions();
    });
  }

  public ngOnDestroy(): void {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
  }

  public resetOptions(): void {
    this.options.forEach((option: UISelectOption) => {
      option.onSelect.subscribe((item: UISelectOption) => {
        this.hanleSelect(item);
        if (!this.isMultiple) this.close();
      });
    });

  }

  private hanleSelect(option: UISelectOption): void {
    const isThisOptionSelected = this.selected.indexOf(option) > -1;
    if (this.isMultiple) {
      let idx = this.selected.indexOf(option);
      idx < 0 ? this.selected.push(option) : this.selected.splice(idx, 1);
    } else {
      this.clearSelection(option);
      this.selected[0] = option;
    }
  }

  private clearSelection(option: UISelectOption) {
    this.selected.forEach((selectedOption: UISelectOption) => {
      if (selectedOption !== option) {
        selectedOption.handleDeselect();
      }
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
