import { Injectable, ComponentRef } from '@angular/core';

@Injectable()
export class Overlay {
  /** 遮罩层 (HTMLElement) */
  public overlay: HTMLElement;
  public componentRef: ComponentRef<any>;
  public instance: any;

  public create(): HTMLElement {
    let container = document.createElement('div');
    container.classList.add('ui-overlay-container');
    document.body.appendChild(container);
    this.overlay = container;
    return this.overlay;
  }

  public remove(): void {
    if (this.overlay && this.overlay.parentNode !== null)
      this.overlay.parentNode.removeChild(this.overlay);
  }
}

