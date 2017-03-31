import {
  Component,
  ViewChild,
  Input,
  Renderer,
  ElementRef,
  NgModule,
  NgZone,
  ModuleWithProviders
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceNumber } from '../util';
import './progress-circle.scss';

// 1度弧度
const DEGREE_IN_RADIANS = Math.PI / 180;
// 不确定型的动画时间
const DURATION_INDETERMINATE = 667;
// 确定型的动画时间
const DURATION_DETERMINATE = 225;
/** Start animation value of the indeterminate animation */
const startIndeterminate = 3;
/** End animation value of the indeterminate animation */
const endIndeterminate = 80;


/* Maximum angle for the arc. The angle can't be exactly 360, because the arc becomes hidden. */
const MAX_ANGLE = 359.99 / 100;
type EasingFn = (currentTime: number, startValue: number,
                 changeInValue: number, duration: number) => number

function materialEase(currentTime: number, startValue: number,
                      changeInValue: number, duration: number) {
  let time = currentTime / duration;
  let timeCubed = Math.pow(time, 3);
  let timeQuad = Math.pow(time, 4);
  let timeQuint = Math.pow(time, 5);
  return startValue + changeInValue * ((6 * timeQuint) + (-15 * timeQuad) + (10 * timeCubed));
}

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

  // @ViewChild('circle') public _circle: ElementRef;

  public _path: SVGPathElement;
  private _interdeterminateInterval: number;
  get interdeterminateInterval() {
    return this._interdeterminateInterval;
  }
  /** TODO: internal */
  set interdeterminateInterval(interval: any) {
    clearInterval(this._interdeterminateInterval);
    this._interdeterminateInterval = interval;
  }

  constructor(
    private renderer: Renderer,
    private elementRef: ElementRef,
    private _ngZone: NgZone
  ) { }

  // @Input()
  // get size() { return this._size; }
  // set size(value: number) {
  //   this._size = coerceNumber(value);
  //   this.viewBox = `0 0 ${this._size} ${this._size}`;
  // }

  // @Input()
  // get thickness() { return this._thickness; }
  // set thickness(value: number) { this._thickness = coerceNumber(value); }

  // @Input()
  // set stroke(value: string) { this._stroke = value; }

  // @Input()
  // set color(value: string) { this.setStrokeColor(value, true); }

  // @Input()
  // set mode(value: string) { this._mode = value; this.setMode(value, true); }

  // @Input()
  // get value() {
  //   if (this.mode === 'determinate') {
  //     return this.currentValue;
  //   }
  // }
  // set value(v: number) {
  //   this.currentValue = coerceNumber(v);
  //   this.pathAnimation(this._circle.nativeElement);
  // }






  // getRelativeValue(value: number, min: number, max: number) {
  //   const clampedValue = Math.min(Math.max(min, value), max);
  //   return clampedValue / (max - min);
  // }

  // getArcLength(fraction: number) {
  //   return fraction * Math.PI * (this._size - this._thickness);
  // }

  // 路径动画
  // pathAnimation(path: HTMLElement, step: number = 0) {
    // if (this._mode === 'determinate') {
    //   const relVal = this.getRelativeValue(this.currentValue, this.min, this.max);
    //   path.style.strokeDasharray = `${this.getArcLength(relVal)}, ${this.getArcLength(1)}`;
    //   return;
    // };

    // step %= 3;

    // if (step === 0) {
    //   path.style.strokeDasharray = `${this.getArcLength(0)}, ${this.getArcLength(1)}`;
    //   path.style.strokeDashoffset = '0';
    //   path.style.transitionDuration = '0ms';
    // } else if (step === 1) {
    //   path.style.strokeDasharray = `${this.getArcLength(0.7)}, ${this.getArcLength(1)}`;
    //   path.style.strokeDashoffset = `${this.getArcLength(-0.3)}`;
    //   path.style.transitionDuration = '750ms';
    // } else {
    //   path.style.strokeDasharray = `${this.getArcLength(0.7)}, ${this.getArcLength(1)}`;
    //   path.style.strokeDashoffset = `${this.getArcLength(-1)}`;
    //   path.style.transitionDuration = '850ms';
    // }

    // this.pathAnimationTimer = setTimeout(
    //   () => this.pathAnimation(path, step + 1), step ? 750 : 250
    // );
  // }

  // 定义circle背景色
  // setStrokeColor(value: string, isAdd: boolean) {
  //   if (value != null && value !== '') {
  //     this.renderer.setElementClass(this._circle.nativeElement, `${value}`, isAdd);
  //   }
  // }

  // 定义模式并添加对应样式
  // setMode(value: string, isAdd: boolean) {
  //   if (value) {
  //     this.renderer.setElementClass(this.elementRef.nativeElement, `${value}`, isAdd);
  //   }
  // }

  ngOnInit() {
    // this.pathAnimation(this._circle.nativeElement);
    this._startIndeterminateAnimation()
  }

  

  //  MD2

  /** The id of the last requested animation. */
  private _lastAnimationId: number = 0;

  polarToCartesian(radius: number, pathRadius: number, angleInDegrees: number) {
    let angleInRadians = (angleInDegrees - 90) * DEGREE_IN_RADIANS;

    return (radius + (pathRadius * Math.cos(angleInRadians))) +
      ',' + (radius + (pathRadius * Math.sin(angleInRadians)));
  }

  getSvgArc(currentValue: number, rotation: number) {
    let startPoint = rotation || 0;
    let radius = 50;
    let pathRadius = 40;

    let startAngle = startPoint * MAX_ANGLE;
    let endAngle = currentValue * MAX_ANGLE;
    let start = this.polarToCartesian(radius, pathRadius, startAngle);
    let end = this.polarToCartesian(radius, pathRadius, endAngle + startAngle);
    let arcSweep = endAngle < 0 ? 0 : 1;
    let largeArcFlag: number;

    if (endAngle < 0) {
      largeArcFlag = endAngle >= -180 ? 0 : 1;
    } else {
      largeArcFlag = endAngle <= 180 ? 0 : 1;
    }

    return `M${start}A${pathRadius},${pathRadius} 0 ${largeArcFlag},${arcSweep} ${end}`;
  }

  private _renderArc(currentValue: number, rotation: number) {
    // Caches the path reference so it doesn't have to be looked up every time.
    let path = this._path = this._path || this.elementRef.nativeElement.querySelector('path');

    // Ensure that the path was found. This may not be the case if the
    // animation function fires too early.
    if (path) {
      path.setAttribute('d', this.getSvgArc(currentValue, rotation));
    }
  }


  /**
   * Animates the circle from one percentage value to another.
   *
   * @param animateFrom The percentage of the circle filled starting the animation.
   * @param animateTo The percentage of the circle filled ending the animation.
   * @param ease The easing function to manage the pace of change in the animation.
   * @param duration The length of time to show the animation, in milliseconds.
   * @param rotation The starting angle of the circle fill, with 0° represented at the top center
   *    of the circle.
   */
  private _animateCircle(animateFrom: number, animateTo: number, ease: EasingFn,
                        duration: number, rotation: number) {

    let id = ++this._lastAnimationId;
    let startTime = Date.now();
    let changeInValue = animateTo - animateFrom;

    // No need to animate it if the values are the same
    if (animateTo === animateFrom) {
      this._renderArc(animateTo, rotation);
    } else {
      let animation = () => {
        let elapsedTime = Math.max(0, Math.min(Date.now() - startTime, duration));

        this._renderArc(
          ease(elapsedTime, animateFrom, changeInValue, duration),
          rotation
        );

        // Prevent overlapping animations by checking if a new animation has been called for and
        // if the animation has lasted longer than the animation duration.
        if (id === this._lastAnimationId && elapsedTime < duration) {
          requestAnimationFrame(animation);
        }
      };

      // Run the animation outside of Angular's zone, in order to avoid
      // hitting ZoneJS and change detection on each frame.
      this._ngZone.runOutsideAngular(animation);
    }
  }

  private _startIndeterminateAnimation() {
    let rotationStartPoint = 0;
    let start = startIndeterminate;
    let end = endIndeterminate;
    let duration = DURATION_INDETERMINATE;
    let animate = () => {
      this._animateCircle(start, end, materialEase, duration, rotationStartPoint);
      // Prevent rotation from reaching Number.MAX_SAFE_INTEGER.
      rotationStartPoint = (rotationStartPoint + end) % 100;
      let temp = start;
      start = -end;
      end = -temp;
    };

    if (!this.interdeterminateInterval) {
      this._ngZone.runOutsideAngular(() => {
        this.interdeterminateInterval = setInterval(animate, duration + 50, 0, false);
        animate();
      });
    }
  }

  private _cleanupIndeterminateAnimation() {
    this.interdeterminateInterval = null;
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
