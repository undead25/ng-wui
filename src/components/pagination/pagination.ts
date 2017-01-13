import {
  Component,
  Input,
  EventEmitter,
  Output,
  NgModule,
  ModuleWithProviders,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBoolean, coerceNumber, KeyCodes } from '../util';
import { UIInputModule } from '../input';

@Component({
  selector: 'ui-pagination',
  templateUrl: 'pagination.html'
})

export class UIPagination implements OnInit {
  // 总记录数
  public _totalRecords: number = 0;
  // 每页条数
  public _pageSize: number = 10;
  // 当前页码
  public _current: number = 1;
  // 总页数
  public pages: number[];
  // 需要显示的页数
  public visiblePages: number = 7;
  // 需要跳转的页码
  public inputValue: number;
  // 输入的每页记录数
  public inputPageSize: number;
  // 每页显示多少记录数配置
  public _pageSizeOpts: number[] = [10, 20, 30];

  // 是否显示跳转
  public _showJump: boolean = true;
  // 是否显示首页、尾页
  public _showFirstLast: boolean = true;
  // 是否显示总记录数
  public _showTotal: boolean = true;
  // 是否显示每页记录数选择框
  public _showSelect: boolean = false;

  // 输出事件绑定
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter();

  @Input()
  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(value: number) {
    if (value) {
      this._pageSize = coerceNumber(value);
    }
  }

  @Input()
  get total(): number {
    return this._totalRecords;
  }
  set total(value: number) {
    if (value) {
      this._totalRecords = coerceNumber(value);
      this.updatePageLinks();
    }
  }

  @Input()
  get current(): number {
    return this._current;
  }
  set current(value: number) {
    this._current = coerceNumber(value);
  }

  @Input()
  get visible(): number {
    return this.visiblePages;
  }
  set visible(value: number) {
    if (value) this.visiblePages = coerceNumber(value);
  }

  @Input() set showSelect(value: boolean) { this._showSelect = coerceBoolean(value); }

  @Input() set showTotal(value: boolean) { this._showTotal = coerceBoolean(value); }

  @Input() set showJump(value: boolean) { this._showJump = coerceBoolean(value); }

  @Input() set showFirstLast(value: boolean) { this._showFirstLast = coerceBoolean(value); }

  @Input()
  set pageSizeOpts(value: number[]) {
    this._pageSizeOpts = value;
    this._pageSize = value[0];
  }

  /**
   * @method getPageCount()
   * @description 获取总页数
   * @return { number } 总页数
   */
  getPageCount() {
    return Math.ceil(this._totalRecords / this._pageSize) || 1;
  }

  /**
   * @method updatePageLinks()
   * @description 更新显示的页码
   * @return { number[] } 页码数组
   */
  updatePageLinks() {
    this.pages = [];

    const totalPages = this.getPageCount();
    let visiblePages = this.visiblePages;

    if (visiblePages > totalPages) visiblePages = totalPages;

    // 半数，用于显示当前页前后页数
    const half = Math.floor(visiblePages / 2);

    // 起始边界
    let start = this._current - half + 1 - visiblePages % 2;
    let end = this._current + half;

    // 边界起始页小于1
    if (start < 1) {
      start = 1;
      end = visiblePages;
    }

    // 边界末页大于总页数
    if (end > totalPages) {
      end = totalPages;
      start = 1 + totalPages - visiblePages;
    }

    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }

    return this.pages;
  }

  /**
   * @method pageChange()
   * @description 点击页码后更新显示的页码
   * @param { number } page: 点击的页码
   * @param { MouseEvent } event?: 鼠标事件
   * @return { Obejct } page: 当前页面页码, pageSize: 每页记录数, totalRecords: 总记录数
   */
  pageChange(page: number, event?: MouseEvent) {
    if (event) {
      event.preventDefault();

      // 点击当前页直接返回
      if (event.type === 'click' && page === this._current) return;
    }

    if (page > 0 && page <= this.getPageCount()) {
      this._current = page;
      this.updatePageLinks();

      // 回调传值
      const state = {
        page: page,
        pageSize: this._pageSize,
        totalRecords: this._totalRecords
      };

      this.onPageChanged.emit(state);
    }
  }

  /**
   * @method handleKeyup()
   * @description
   *  - 1. 处理需要跳转页面的输入页码不能大于总页码
   *  - 2. 处理 ENTER键 直接跳转对应页面
   * @param { KeyboardEvent } event: 键盘事件，获取用户输入的值
   */
  handleKeyup(event: KeyboardEvent) {
    const target = <HTMLInputElement>event.target;
    let value = coerceNumber(target.value);
    if (value > this.getPageCount()) {
      target.value = this.getPageCount().toString();
      value = this.getPageCount();
    }
    this.inputValue = value;

    if (event.keyCode === KeyCodes.ENTER) this.pageChange(this.inputValue);
  }

  /**
   * @method handleGo()
   * @description 点击跳转按钮，跳转对应页面
   */
  handleGo() {
    if (this.inputValue) this.pageChange(this.inputValue);
  }

  handlePageSizeInput(event: KeyboardEvent) {
    const target = <HTMLInputElement>event.target;
    let value = coerceNumber(target.value);
    this._pageSize = value;
    this.inputPageSize = value;
    if (event.keyCode === KeyCodes.ENTER) this.pageChange(1);
  }

  onPageSize() {
    this.inputPageSize && this.pageChange(1);
  }

  /**
   * @method onSelectChange()
   * @description 选择对应value后改变每页记录数，并更新页码，当前页回到第一页
   * @param { MouseEvent } event: 鼠标事件，获取用户选择的值
   */
  onSelectChange(event: MouseEvent) {
    const target = <HTMLInputElement>event.target;
    let value = coerceNumber(target.value);
    this._pageSize = value;
    this.pageChange(1, event);
  }

  ngOnInit() {
    this.updatePageLinks();
  }
}

@NgModule({
  imports: [CommonModule, UIInputModule],
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
