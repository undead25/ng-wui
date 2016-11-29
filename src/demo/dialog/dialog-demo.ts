import { Component } from '@angular/core';

@Component({
  templateUrl: './dialog-demo.html'
})

export class DialogDemo {
  private openModal: boolean = false;
  private openModal2: boolean = false;
  private openAlert: boolean = false;
  
  private dialogContent: string; 
  constructor() {
  }

  showModal() {
    this.openModal = true;
  }

  onCancel(event: Event) {
    this.openModal = false;
    console.info('取消按钮回调！');
  }

  onOk(event: Event) {
    this.openModal = false;
    console.info('确定按钮回调！');
  }

  showModal2() {
    this.openModal2 = true;
  }

  onCancel2(event: Event) {
    this.openModal2 = false;
  }

  onOk2(event: Event) {
    this.openModal2 = false;
  }

  showAlert() {
    this.openAlert = true;
    this.dialogContent = "用户名或密码错误！"
  }
  
  onAlertOkClose() {
    this.openAlert = false;
  }
}