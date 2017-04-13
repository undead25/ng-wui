import { Component } from '@angular/core';

@Component({
  templateUrl: './switch-demo.html'
})

export class SwitchDemo {
  public binding: string = 'female';

  public testOnChange(event: any) {
    console.log(event);
  }
}
