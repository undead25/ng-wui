import { NgModule, ModuleWithProviders, Injectable, ElementRef } from '@angular/core';

@Injectable()

export class UIOverlay {
  private eventHandlers = new Map<string, (e: Event) => void>();
  private overlayElement: HTMLElement;

  constructor() {
    this.eventHandlers.set('click', (event: MouseEvent) => {
      this.handleClick(event);
    })
  }
  
  // 创建并显示遮罩层
  create() {
    let overlayDiv = document.createElement('div');
    overlayDiv.classList.add('ui-overlay');
    overlayDiv.classList.add('fade');
    document.body.appendChild(overlayDiv);
    setTimeout(()=>{
      overlayDiv.classList.add('active');
    },1)

    this.overlayElement = overlayDiv;
  }

  // 隐藏并移除遮罩层
  remove() {
    const el = this.overlayElement;
    if(el) {
      el.classList.remove('active');
      el.addEventListener('transitionend', (event: TransitionEvent) => {
        if(event.propertyName === 'opacity') {
          el.parentNode.removeChild(el);
        };
      })
    }
  }

  private handleClick(event: MouseEvent) {
    
  }
}

export const OVERLAY_PROVIDERS = UIOverlay;
