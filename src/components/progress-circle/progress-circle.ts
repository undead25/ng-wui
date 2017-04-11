import {
  Component,
  ViewChild,
  Input,
  Renderer2,
  ElementRef,
  NgZone,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumber, coerceBoolean } from '../util';
import './progress-circle.scss';

/**
 * @export
 * @class UIProgressCircle
 */
@Component({
  selector: 'ui-progress-circle',
  templateUrl: 'progress-circle.html',
  styleUrls: ['./progress-circle.scss'],
  host: {
    '[class.indeterminate]': 'isIndeterminate',
    '[class.ui-progress-circle]': 'true'
  },
  encapsulation: ViewEncapsulation.None
})

export class UIProgressCircle {
  private isIndeterminate = true;
  private _thickness: number = 3.5;
  private _size: number = 50;
  private _progress: number = 0;

  /**
   * Creates an instance of UIProgressCircle.
   * @param {ElementRef} elementRef
   * @param {Renderer2} renderer
   */
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.setContainerSize(this._size);
  }

  @Input() set determinate(value:boolean) {
    if(coerceBoolean(value)) this.isIndeterminate = false;
  }
  /** Circle's line width (svg circle stroke-width attribute) */
  @Input()
  get thickness(): number { return this._thickness; }
  set thickness(value: number) { value && (this._thickness = value); }

  /** Circle's color */
  @Input() set color(value: string) {
    value && (this.renderer.addClass(this.elementRef.nativeElement, value));
  }

  /** Circle's width and height */
  @Input()
  set size(value: number) { value && this.setContainerSize(value); }

  public getDash() {
    if (this.isIndeterminate) return;
    let progress = this._progress * 125 / 100;
  }

  /**
   * Sets circle's with and height
   * @private
   * @param {number} value - circle's size
   */
  private setContainerSize(value: number) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', `${value}px`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', `${value}px`);
  }


}


