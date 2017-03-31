import { Component } from '@angular/core';

@Component({
  templateUrl: './select-demo.html'
})

export class SelectDemo {
  public countries: any[] = [
    {code: 1, name: '中国'},
    {code: 2, name: '美国'},
    {code: 3, name: '俄罗斯'},
  ];
}
