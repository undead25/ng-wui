import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'input-demo',
  templateUrl: 'input-demo.html'
})
export class InputDemo implements OnInit {
  @Input() error: string = '';
  @Input()
  get isValid() {
    return this.form.valid;
  }

  public model: string = 'ABC';
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  handleBlur(event: FocusEvent) {
    const v = (<HTMLInputElement>event.target).value;

    if (v === '') {
      this.error = '请输入用户名';
    } else if (v.length < 4) {
      this.error = '至少大于4位';
    } else {
      this.error = '';
    }
    console.log(this.model);
  }

  onReset() {
    this.form.reset();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(18)])],
      sex: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(18)])]
    });
  }
}
