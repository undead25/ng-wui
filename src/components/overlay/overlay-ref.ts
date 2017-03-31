import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { NgZone } from '@angular/core';

export class OverlayRef {
  private overlayElement: HTMLElement;
  private backdropElement: HTMLElement;
  private _afterBackdropRemoved: Subject<any> = new Subject();
  private _backdropClick: Subject<any> = new Subject();

  constructor(private ngZone: NgZone) {
  }

  public createOverlay(hasBackDrop:boolean, darkBackdrop?: boolean) {
    let container = document.createElement('div');
    container.classList.add('ui-overlay-container');
    document.body.appendChild(container);

    hasBackDrop && (container.appendChild(this.createBackdrop(darkBackdrop)));

    this.overlayElement = container;
    return this.overlayElement;
  }

  public removeOverlay(hasDarkBackdrop?: boolean) {
    if (hasDarkBackdrop) {
      this.removeBackdrop();
      this.afterBackdropRemoved().subscribe(() => {
        this.removeEl();
      });
    } else {
      this.removeEl();
    }
  }

  public createBackdrop(darkBackdrop?: boolean): HTMLElement {
    this.backdropElement = document.createElement('div');
    this.backdropElement.classList.add('ui-overlay-backdrop');
    darkBackdrop && (setTimeout(() => this.backdropElement.classList.add('active'), 1));
    this.backdropElement.addEventListener('click', () => this._backdropClick.next());
    return this.backdropElement;
  }

  public removeBackdrop() {
    let backdrop = this.backdropElement;
    if (backdrop) {
      let removeEl = () => {
        if (backdrop && backdrop.parentNode) {
          backdrop.parentNode.removeChild(backdrop);
        }

        if (backdrop = this.backdropElement) {
          this.backdropElement = null;
        }
        this._afterBackdropRemoved.next();
      };

      backdrop.classList.remove('active');
      backdrop.addEventListener('transitionend', removeEl);
      this.ngZone.runOutsideAngular(() => {
        setTimeout(removeEl, 500);
      });
    }
  }

  public afterBackdropRemoved(): Observable<void> {
    return this._afterBackdropRemoved.asObservable();
  }

  public backdropClick(): Observable<void> {
    return this._backdropClick.asObservable();
  }

  private removeEl() {
    if (this.overlayElement && this.overlayElement.parentNode) {
      this.overlayElement.parentNode.removeChild(this.overlayElement);
      this.overlayElement = null;
    }
  }

}
