import { Component, Input, ElementRef, EventEmitter, Output, NgModule, Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextareaAutosize } from './autosize';
import { coerceBoolean, setUid } from '../util';
export var UIInput = (function () {
    function UIInput(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        // placeholder 属性值
        this._placeholder = null;
        // value 属性值
        this._value = null;
        // label 文字
        this.labelText = null;
        // 是否只读
        this._readonly = false;
        // 是否禁用
        this._disabled = false;
        // 是否为必须项
        this._required = false;
        // 是否自动focus
        this._autofocus = false;
        // 是否focus
        this._focused = false;
        // 是否有label
        this._hasLabel = false;
        // 是否有placeholder
        this._hasPlaceholder = false;
        // 是否激活placeholder, 激活即隐藏
        this._isPlaceholderActive = false;
        this.id = setUid('uiInput');
        this.name = null;
        this.type = 'text';
        this.maxlength = null;
        this.tabindex = null;
        // 错误文字
        this.error = '';
        // 帮助文字
        this.help = '';
        // only textarea
        this.rows = null;
        this.cols = null;
        this.onBlur = new EventEmitter();
        this.onFocus = new EventEmitter();
        var _nodeName = elementRef.nativeElement.nodeName.toLowerCase();
        this.inputType = _nodeName === 'ui-input' ? 'input' : 'textarea';
    }
    Object.defineProperty(UIInput.prototype, "placeholder", {
        get: function () { return this._placeholder; },
        set: function (value) {
            if (value) {
                this._placeholder = value;
                this._hasPlaceholder = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "value", {
        get: function () { return this._value; },
        set: function (v) { if (v !== this._value)
            this._value = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "label", {
        get: function () { return this.labelText; },
        set: function (value) {
            if (value) {
                this.labelText = value;
                this._hasLabel = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "required", {
        get: function () { return this._required; },
        set: function (value) { this._required = coerceBoolean(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "disabled", {
        get: function () { return this._disabled; },
        set: function (value) { this._disabled = coerceBoolean(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (value) { this._readonly = coerceBoolean(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIInput.prototype, "autofocus", {
        get: function () { return this._autofocus; },
        set: function (value) { this._autofocus = coerceBoolean(value); },
        enumerable: true,
        configurable: true
    });
    // focus事件
    UIInput.prototype.handleFocus = function (event) {
        this._focused = true;
        var _value = event.target.value;
        if (this._hasPlaceholder && this._hasLabel && _value.length === 0)
            this._isPlaceholderActive = false;
        this.onFocus.emit(event);
    };
    // blur事件
    UIInput.prototype.handleBlur = function (event) {
        var _value = event.target.value;
        this._focused = false;
        if (this._hasLabel && this._hasPlaceholder) {
            this._isPlaceholderActive = true;
        }
        else if (_value.length === 0) {
            this._isPlaceholderActive = false;
        }
        this.onBlur.emit(event);
    };
    // change事件
    UIInput.prototype.handleChange = function (event) {
        this._value = event.target.value;
    };
    // keyup事件
    UIInput.prototype.handleKeyup = function (event) {
        var _value = event.target.value;
        _value.length > 0 ? this._isPlaceholderActive = true : this._isPlaceholderActive = false;
        if ((event.which === 13 && this.inputType !== 'textarea') || event.which === 27)
            event.target.blur();
    };
    // 是否需要激活label
    UIInput.prototype.isLabelActive = function () {
        return this._value ? true : this._focused;
    };
    // 让既有label又有placeholder的input隐藏placeholder
    UIInput.prototype.ngAfterContentInit = function () {
        if (this._hasLabel && this._hasPlaceholder)
            this._isPlaceholderActive = true;
    };
    UIInput.decorators = [
        { type: Component, args: [{
                    selector: 'ui-input, ui-textarea',
                    templateUrl: 'input.html'
                },] },
    ];
    /** @nocollapse */
    UIInput.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    UIInput.propDecorators = {
        'id': [{ type: Input },],
        'name': [{ type: Input },],
        'type': [{ type: Input },],
        'maxlength': [{ type: Input },],
        'tabindex': [{ type: Input },],
        'error': [{ type: Input },],
        'help': [{ type: Input },],
        'placeholder': [{ type: Input },],
        'value': [{ type: Input },],
        'label': [{ type: Input },],
        'required': [{ type: Input },],
        'disabled': [{ type: Input },],
        'readonly': [{ type: Input },],
        'autofocus': [{ type: Input },],
        'rows': [{ type: Input },],
        'cols': [{ type: Input },],
        'onBlur': [{ type: Output },],
        'onFocus': [{ type: Output },],
    };
    return UIInput;
}());
export var UIInputModule = (function () {
    function UIInputModule() {
    }
    UIInputModule.forRoot = function () {
        return {
            ngModule: UIInputModule
        };
    };
    UIInputModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [UIInput, TextareaAutosize],
                    declarations: [UIInput, TextareaAutosize]
                },] },
    ];
    /** @nocollapse */
    UIInputModule.ctorParameters = [];
    return UIInputModule;
}());
