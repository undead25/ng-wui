import { Component } from '@angular/core';

@Component({
  templateUrl: './checkbox-demo.html'
})

export class CheckboxDemo {
  public selectedCountries: string[] = ['中国'];
  public testOnChange(value: any) {
    console.log(value);
  }
}
