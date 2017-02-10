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

  // public createOverlay(hasBackDrop?: boolean) {
  //   let container = document.createElement('div');
  //   container.classList.add('ui-overlay-container');
  //   document.body.appendChild(container);

  //   if (hasBackDrop) {
  //     this.overlayRef = this.createOverlayRef();
  //     container.appendChild(this.overlayRef.createBackdrop());
  //   }

  //   this.overlayElement = container;
  //   return this.overlayElement;
  // }

  // private createContainer(hasBackDrop?: boolean) {
  //   let container = document.createElement('div');
  //   container.classList.add('ui-overlay-container');
  //   document.body.appendChild(container);

  //   if (hasBackDrop) {
  //     this.overlayRef = this.createOverlayRef();
  //     container.appendChild(this.overlayRef.createBackdrop());
  //   }

  //   this.overlayElement = container;
  // }

  // tslint:disable-next-line:member-ordering
  // public removeOverlay(overlayContainer?: HTMLElement, hasBackDrop?: boolean) {
  //   if (hasBackDrop) {
  //     this.overlayRef.removeBackdrop();
  //     this.overlayRef.afterBackdropRemoved().subscribe(() => {
  //       this.removeEl(overlayContainer);
  //     });
  //   } else {
  //     this.removeEl(overlayContainer);
  //   }
  // }

  /**
   * DOM创建遮罩层
   * @returns {HTMLElement}
   */
  // public create(hasBackDrop?: boolean): HTMLElement {
  //   let container = document.createElement('div');
  //   container.classList.add('ui-overlay-container');
  //   document.body.appendChild(container);
  //   this.overlay = container;
  //   if (hasBackDrop) {
  //     let backdrop = document.createElement('div');
  //     backdrop.classList.add('ui-overlay-backdrop');
  //     this.overlay.appendChild(backdrop);
  //     setTimeout(() => backdrop.classList.add('active'), 1);
  //     this.backdrop = backdrop;
  //   }
  //   return this.overlay;
  // }

  /**
   * DOM移除遮罩层
   */
  // public remove(): void {
  //   if (this.overlay && this.overlay.parentNode !== null)
  //     this.overlay.parentNode.removeChild(this.overlay);
  // }

  // public removeBackdrop() {
  //   if (this.overlay) {
  //     this.backdrop.classList.remove('active');
  //   }
  // }

  // private removeEl(overlayContainer?: HTMLElement) {
  //   if (overlayContainer && overlayContainer.parentNode) {
  //     overlayContainer.parentNode.removeChild(overlayContainer);
  //     this.overlayElement = null;
  //   }
  // }

  // private createOverlayRef() {
  //   return new OverlayRef(this.overlayElement, this.ngZone);
  // }

}

