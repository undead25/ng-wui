import {
  Component,
  ViewChild,
  Input,
  Renderer,
  ElementRef,
  NgModule,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceNumber } from '../util';

@Component({
  selector: 'ui-progress-circle',
  templateUrl: 'progress-circle.html'
})

export class UIProgressCircle {

  public _mode: string = 'indeterminate';
  public _size: number = 60;
  public viewBox: any = `0 0 ${this._size} ${this._size}`;
  public _thickness: number = 4;
  public pathAnimationTimer: any;
  public _stroke: string;

  public min: number = 0;
  public max: number = 100;
  public currentValue: number = 0;

  @ViewChild('circle') public _circle: ElementRef;

  constructor(private renderer: Renderer, private elementRef: ElementRef) { }

  @Input()
  get size() { return this._size; }
  set size(value: number) {
    this._size = coerceNumber(value);
    this.viewBox = `0 0 ${this._size} ${this._size}`;
  }

  @Input()
  get thickness() { return this._thickness; }
  set thickness(value: number) { this._thickness = coerceNumber(value); }

  @Input()
  set stroke(value: string) { this._stroke = value; }

  @Input()
  set color(value: string) { this.setStrokeColor(value, true); }

  @Input()
  set mode(value: string) { this._mode = value; this.setMode(value, true); }

  @Input()
  get value() {
    if (this.mode === 'determinate') {
      return this.currentValue;
    }
  }
  set value(v: number) {
    this.currentValue = coerceNumber(v);
    this.pathAnimation(this._circle.nativeElement);
  }

  getRelativeValue(value: number, min: number, max: number) {
    const clampedValue = Math.min(Math.max(min, value), max);
    return clampedValue / (max - min);
  }

  getArcLength(fraction: number) {
    return fraction * Math.PI * (this._size - this._thickness);
  }

  // 路径动画
  pathAnimation(path: HTMLElement, step: number = 0) {
    if (this._mode === 'determinate') {
      const relVal = this.getRelativeValue(this.currentValue, this.min, this.max);
      path.style.strokeDasharray = `${this.getArcLength(relVal)}, ${this.getArcLength(1)}`;
      return;
    };

    step %= 3;

    if (step === 0) {
      path.style.strokeDasharray = `${this.getArcLength(0)}, ${this.getArcLength(1)}`;
      path.style.strokeDashoffset = '0';
      path.style.transitionDuration = '0ms';
    } else if (step === 1) {
      path.style.strokeDasharray = `${this.getArcLength(0.7)}, ${this.getArcLength(1)}`;
      path.style.strokeDashoffset = `${this.getArcLength(-0.3)}`;
      path.style.transitionDuration = '750ms';
    } else {
      path.style.strokeDasharray = `${this.getArcLength(0.7)}, ${this.getArcLength(1)}`;
      path.style.strokeDashoffset = `${this.getArcLength(-1)}`;
      path.style.transitionDuration = '850ms';
    }

    this.pathAnimationTimer = setTimeout(
      () => this.pathAnimation(path, step + 1), step ? 750 : 250
    );
  }

  // 定义circle背景色
  setStrokeColor(value: string, isAdd: boolean) {
    if (value != null && value !== '') {
      this.renderer.setElementClass(this._circle.nativeElement, `${value}`, isAdd);
    }
  }

  // 定义模式并添加对应样式
  setMode(value: string, isAdd: boolean) {
    if (value) {
      this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
    }
  }

  ngOnInit() {
    this.pathAnimation(this._circle.nativeElement);
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [UIProgressCircle],
  declarations: [UIProgressCircle],
  providers: [],
})

export class UIProgressCircleModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UIProgressCircleModule,
      providers: []
    };
  }
}
