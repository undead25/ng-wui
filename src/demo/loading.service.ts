import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Injectable()

export class LoadingService {
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      let isStart = event instanceof NavigationStart;
      let isEnd = event instanceof NavigationEnd || event instanceof NavigationError;

      if (isStart) this
    })
  }
}