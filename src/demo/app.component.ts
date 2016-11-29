import {Component} from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <h1>欢迎来到Angular2 WUI</h1>
    <ul>
      <li><a routerLink="/button">按钮</a></li>
      <li><a routerLink="/dialog">弹出框</a></li>
      <li><a routerLink="/input">输入框</a></li>
    </ul>
    <router-outlet></router-outlet>
  `
})

export class AppComponent{}
