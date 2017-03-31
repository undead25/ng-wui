import { Injectable, NgZone } from '@angular/core';
import { OverlayRef } from './overlay-ref';

@Injectable()
export class Overlay {
  /** 遮罩层 */
  public overlayElement: HTMLElement;
  public overlayRef: OverlayRef;

  constructor(private ngZone: NgZone) { }

  public create(hasBackDrop?: boolean) {
    return new OverlayRef(this.ngZone);
  }
}

