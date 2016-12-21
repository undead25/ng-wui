import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styles: ['li {display: inline-block; padding: 10px; margin-bottom: 20px;}'],
  template: `
    
    <div style="width: 1000px; margin: 0 auto;">
      
      <ul>
        <li><a routerLink="/button" [attr.data]="isLoading">按钮</a></li>
        <li><a routerLink="/dialog">弹出框</a></li>
        <li><a routerLink="/input">输入框</a></li>
        <li><a routerLink="/pagination">分页</a></li>
        <li><a routerLink="/progress-circle">圆形进度条</a></li>
      </ul>
      <router-outlet></router-outlet>
    </div>
    
  `,
})

export class AppComponent {

}
