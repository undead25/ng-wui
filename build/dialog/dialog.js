import { Component, Input, Output, ElementRef, Renderer, NgModule, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBoolean } from '../util';
import { UIButtonModule } from '../button';
export var UIDialog = (function () {
    function UIDialog(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        // 是否已经打开
        this._open = false;
        // 是否有title
        this._hasTitle = true;
        this._okLabel = '确定';
        this._cancelLabel = '取消';
        // 是否有顶部toolbar (适用于modal)
        this._hasToolbar = false;
        // 是否内容可以scroll (适用于modal)
        this._scroll = false;
        // 是否启用esc键关闭
        this._escHide = true;
        // 是否为alert框
        this._isAlert = false;
        // 点击取消按钮后回调
        this.onCancelClose = new EventEmitter();
        // 点击确定按钮后回调
        this.onOkClose = new EventEmitter();
    }
    Object.defineProperty(UIDialog.prototype, "open", {
        get: function () {
            return this._open;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._open)
                return;
            this._open = coerceBoolean(value);
            if (this._open) {
                this.setDialogOpen();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "header", {
        set: function (value) {
            if (value) {
                this._hasTitle = true;
                this._titleText = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "toolbar", {
        set: function (value) {
            if (value) {
                this._hasToolbar = true;
                this._toolbarText = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "scroll", {
        get: function () {
            return this._scroll;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._scroll)
                return;
            this._scroll = coerceBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "esc", {
        get: function () {
            return this._escHide;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._escHide)
                return;
            this._escHide = coerceBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "alert", {
        get: function () {
            return this._isAlert;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._isAlert)
                return;
            this._isAlert = coerceBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIDialog.prototype, "okLabel", {
        set: function (value) {
            this._okLabel = value;
        },
        enumerable: true,
        configurable: true
    });
    UIDialog.prototype.hasTitle = function () {
        return this._hasTitle;
    };
    UIDialog.prototype.hasToolbar = function () {
        return this._hasToolbar;
    };
    UIDialog.prototype.isAlert = function () {
        return this._isAlert;
    };
    // 点击取消按钮，且绑定esc键事件
    UIDialog.prototype.onCancel = function (e) {
        if (e)
            e.stopPropagation();
        if (this._open) {
            this.setDialogClose();
            this.onCancelClose.emit();
        }
    };
    // 点击确定按钮
    UIDialog.prototype.onOk = function () {
        if (this._open) {
            this.setDialogClose();
            this.onOkClose.emit();
        }
    };
    // 显示弹出框
    UIDialog.prototype.setDialogOpen = function () {
        document.body.classList.add('overflow');
    };
    // 关闭弹出框 
    UIDialog.prototype.setDialogClose = function () {
        document.body.classList.remove('overflow');
    };
    // 绑定esc keydown事件
    UIDialog.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this._escHide) {
            this.renderer.listenGlobal('document', 'keydown', function (event) {
                if (event.which === 27) {
                    _this.onCancel(event);
                }
            });
        }
    };
    UIDialog.decorators = [
        { type: Component, args: [{
                    selector: 'ui-dialog',
                    templateUrl: './dialog.html'
                },] },
    ];
    /** @nocollapse */
    UIDialog.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    UIDialog.propDecorators = {
        'onCancelClose': [{ type: Output },],
        'onOkClose': [{ type: Output },],
        'open': [{ type: Input },],
        'header': [{ type: Input },],
        'toolbar': [{ type: Input },],
        'scroll': [{ type: Input },],
        'esc': [{ type: Input },],
        'alert': [{ type: Input },],
        'okLabel': [{ type: Input },],
    };
    return UIDialog;
}());
export var UIDialogModule = (function () {
    function UIDialogModule() {
    }
    UIDialogModule.forRoot = function () {
        return {
            ngModule: UIDialogModule,
        };
    };
    UIDialogModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, UIButtonModule],
                    exports: [UIDialog],
                    declarations: [UIDialog],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    UIDialogModule.ctorParameters = [];
    return UIDialogModule;
}());
