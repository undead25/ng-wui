import { Component, Output, EventEmitter, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'ui-select-option',
  template: '<ng-content></ng-content>',
  host: {
    '(click)': 'handleSelect()'
  }
})
export class UISelectOption {

  @Input() value: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  private _selected: boolean = false;
  private _disabled: boolean = false;
  private nativeElement: HTMLElement;
  get selected(): boolean {
    return this._selected;
  }
  get viewValue(): string {
    return this.nativeElement.textContent.trim();
  }

  constructor(private elementRef: ElementRef) {
    this.nativeElement = elementRef.nativeElement;
  }

  public handleSelect() {
    if (!this._disabled) {
      this._selected = true;
      this.onSelect.emit(this);
    }
  }
}
