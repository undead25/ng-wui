import {
  Component,
  Input,
  AfterContentInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  forwardRef,
  Renderer
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBoolean, coerceNumber } from '../util';

@Component({
  selector: 'ui-pagination',
  templateUrl: 'pagination.html'
})

export class UIPagination {
  // 总记录数
  public _totalRecords: number = 0;
  
  @Input()
  get totalRecords(): number {
    return this._totalRecords;
  }
  set totalRecords(value: number) {
    this._totalRecords = coerceNumber(value);
  }
  
  // 
  @Input() pageSize: number = 0;
  

  // getPage():number {
  //   return Math.floor
  // }

}

@NgModule({
  imports: [CommonModule],
  exports: [UIPagination],
  declarations: [UIPagination]
})
export class UIPaginationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIPaginationModule
    };
  }
}
