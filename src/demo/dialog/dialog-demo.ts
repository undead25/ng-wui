import { Component, ViewChild, OnInit } from '@angular/core';
import { UIDialogService, UIDialog } from '../../components/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dialog-demo.html',
  providers: [UIDialogService]
})

export class DialogDemo {
  public message: string;
  constructor(public dialog: UIDialogService) { }

  public handleAlert() {
    const _alert = this.dialog.open({
      message: '这是提示哈！',
      isAlert: true,
    });
    _alert.onOk().subscribe(() => {
      this.message = 'alert弹框关闭了';
    });

  }

  public handleConfirm() {
    const _confirm = this.dialog.open({
      message: '你真的确定吗？',
    });
    _confirm.onOk().subscribe(() => {
      this.message = '确定按钮回调';
    });
    _confirm.onCancel().subscribe(() => {
      this.message = '取消按钮回调';
    });
  }

  public handleMulti() {
    let _confirm = this.dialog.open({
      message: 'Are you sure?',
      okLabel: 'Confirm',
      cancelLabel: 'Cancel',
      disableOkClose: true
    });
    _confirm.onOk().subscribe(() => {
      let _alert = this.dialog.open({ message: '要关闭询问弹框了哦' });
      _alert.onOk().subscribe(() => {
        _confirm.close();
        this.message = '询问弹框确定按钮回调';
      });
    });

    _confirm.onCancel().subscribe(() => {
      this.message = '你点击了Cancel按钮！';
    });
  }

  public handleModal() {
    let modal = this.dialog.open({
      isModal: true,
      toolbarText: '模态框',
      disableOkClose: true
    }, DemoModal);

    console.log(modal);


    modal.onOk().subscribe(() => {
      let _confirm = this.dialog.open({
        message: '你确定要提交'
      });

      _confirm.onOk().subscribe(() => {
        modal.onSubmit();
        modal.close();
        this.message = '你的用户名和密码请看log';
      });
    });
    modal.onCancel().subscribe(() => {
      this.message = '你点击了modal框的取消按钮';
    });
  }
}

@Component({
  templateUrl: './demo-modal.html',
  providers: [UIDialogService]
})
export class DemoModal implements OnInit {
  public config: any;
  public form: FormGroup;

  @ViewChild(UIDialog)
  private dialogComponent: UIDialog;

  constructor(private formBuilder: FormBuilder, private dialog: UIDialogService) { }

  public onOk() {
    return this.dialogComponent._onOk.asObservable();
  }
  public close() {
    this.dialogComponent.close();
  }

  public onCancel() {
    return this.dialogComponent._onCancel.asObservable();
  }

  public onSubmit() {
    console.log(this.form.value);
    this.close();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
