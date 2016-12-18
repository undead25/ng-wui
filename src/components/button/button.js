var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, ElementRef, Renderer, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRippleModule } from '../ripple';
import { coerceBoolean } from '../util';
export var UIButton = (function () {
    function UIButton(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        // 是否禁用
        this._disabled = null;
        // 是否禁用ripple
        this._rippleDisabled = false;
    }
    Object.defineProperty(UIButton.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._disabled)
                return;
            this._disabled = coerceBoolean(value) ? true : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIButton.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this.setButtonColor(value, true);
            this._color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIButton.prototype, "rippleDisabled", {
        get: function () {
            return this._rippleDisabled;
        },
        set: function (value) {
            if (coerceBoolean(value) === this._rippleDisabled)
                return;
            this._rippleDisabled = coerceBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    // 根据color属性值改变按钮颜色
    UIButton.prototype.setButtonColor = function (value, isAdd) {
        if (value != null && value !== '') {
            this.renderer.setElementClass(this.elementRef.nativeElement, "" + value, isAdd);
        }
    };
    // 给ripple提供HTMLElement
    UIButton.prototype.getRippleElement = function () {
        return this.elementRef.nativeElement;
    };
    // 给ripple提供背景色（深色还是浅色）
    UIButton.prototype.isRippleDark = function () {
        var el = this.elementRef.nativeElement;
        if (!el.hasAttribute('raised'))
            return true;
        if (el.hasAttribute('raised') && !el.hasAttribute('color'))
            return true;
    };
    // 设置是否禁用ripple
    UIButton.prototype.isRippleDisabled = function () {
        return this._rippleDisabled || this._disabled;
    };
    UIButton.decorators = [
        { type: Component, args: [{
                    selector: 'button[ui-button]',
                    templateUrl: 'button.html',
                    host: {
                        '[disabled]': 'disabled'
                    }
                },] },
    ];
    /** @nocollapse */
    UIButton.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    UIButton.propDecorators = {
        'disabled': [{ type: Input },],
        'color': [{ type: Input },],
        'rippleDisabled': [{ type: Input },],
    };
    return UIButton;
}());
export var UIAnchorButton = (function (_super) {
    __extends(UIAnchorButton, _super);
    function UIAnchorButton(elementRef, renderer) {
        _super.call(this, elementRef, renderer);
    }
    UIAnchorButton.prototype.handleAnchorClick = function (event) {
        // if (this._disabled) {
        //   event.preventDefault();
        //   event.stopImmediatePropagation();
        // }
    };
    UIAnchorButton.decorators = [
        { type: Component, args: [{
                    selector: 'a[ui-button]',
                    templateUrl: 'button.html',
                    host: {
                        '[attr.disabled]': 'disabled',
                        '(click)': 'handleAnchorClick($event)'
                    },
                    inputs: ['color', 'disabled', 'rippleDisabled']
                },] },
    ];
    /** @nocollapse */
    UIAnchorButton.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    return UIAnchorButton;
}(UIButton));
export var UIButtonModule = (function () {
    function UIButtonModule() {
    }
    UIButtonModule.forRoot = function () {
        return {
            ngModule: UIButtonModule,
            providers: []
        };
    };
    UIButtonModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, UIRippleModule],
                    exports: [UIButton, UIAnchorButton],
                    declarations: [UIButton, UIAnchorButton],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    UIButtonModule.ctorParameters = [];
    return UIButtonModule;
}());
