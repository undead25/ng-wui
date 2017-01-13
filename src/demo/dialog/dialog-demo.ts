import { Component } from '@angular/core';

@Component({
  templateUrl: './dialog-demo.html'
})

export class DialogDemo {
  public openAlert: boolean = false;
  public openModal: boolean = false;

  public alertContent: string;

  public onAlert() {
    this.openAlert = true;
    this.alertContent = '提示';
  }

  public onModal() {
    this.openModal = true;
  }

  public onAlertOkClose() {
    this.openAlert = false;
    this.alertContent = '';
  }

  public onModalOkClose() {
    this.openModal = false;
  }

  public onModalCancel() {
    this.openModal = false;
  }
}
