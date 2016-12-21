import { Component } from '@angular/core';

@Component({
  templateUrl: 'progress-circle-demo.html'
})
export class ProgressCircleDemo {
  public complete: number = 0;
  public timer = setTimeout(() => this.progress(20), 1000);

  progress(completed: number) {
    if (completed > 100) {
      this.complete = 100;
    } else {
      this.complete = completed;
      const diff = Math.random() * 30;
      this.timer = setTimeout(() => this.progress(completed + diff), 1000);
    }
  }
}
