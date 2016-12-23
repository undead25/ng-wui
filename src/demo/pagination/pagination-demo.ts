import { Component } from '@angular/core';

@Component({
  templateUrl: './pagination-demo.html'
})

export class PaginationDemo {

  pageChanged(event: any) {
    console.log(event.page);
  }
}
