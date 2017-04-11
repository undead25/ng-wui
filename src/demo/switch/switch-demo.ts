import { Component } from '@angular/core';

@Component({
  templateUrl: './switch-demo.html'
})

export class SwitchDemo {

  public testOnChange(event: any) {
    console.log(event);
  }
}
