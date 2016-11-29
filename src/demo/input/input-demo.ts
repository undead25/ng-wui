import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-demo',
  templateUrl: 'input-demo.html'
})
export class InputDemo {
  constructor(){}
  @Input() error: string = '';

  handleBlur(event: FocusEvent) {
    const v = (<HTMLInputElement>event.target).value;
    
    if (v == '') {
      this.error = '请输入用户名'
    } else if (v.length < 4) {
      this.error = '至少大于4位'
    } else {
      this.error = ''
    }
  }
}
