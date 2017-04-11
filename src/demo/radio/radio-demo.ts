import { Component } from '@angular/core';

@Component({
  templateUrl: './radio-demo.html'
})

export class RadioDemo {
  public binding: string = 'female';
  public cities: string = '广州';

  public testOnChange(event: any) {
    console.log(event);
  }
}
