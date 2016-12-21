import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-demo.html'
})

export class PaginationDemo {
  pageChanged(event: Event) {
    console.log(event);
  }
}
