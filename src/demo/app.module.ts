import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES } from './app.routing';
import { UIModule } from '../components';
import { AppComponent } from './app.component';
import { Home } from './home/home';
import { ButtonDemo } from './button/button-demo';
import { DialogDemo } from './dialog/dialog-demo';
import { InputDemo } from './input/input-demo';
import { PaginationDemo } from './pagination/pagination-demo';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    UIModule.forRoot()
  ],
  declarations: [
    AppComponent,
    Home,
    ButtonDemo,
    DialogDemo,
    InputDemo,
    PaginationDemo
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
