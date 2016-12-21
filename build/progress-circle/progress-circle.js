import { Component, ViewChild, Input, Renderer, ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceNumber } from '../util';
export var UIProgressCircle = (function () {
    function UIProgressCircle(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this._mode = 'indeterminate';
        this._size = 60;
        this.viewBox = "0 0 " + this._size + " " + this._size;
        this._thickness = 4;
        this.min = 0;
        this.max = 100;
        this.currentValue = 0;
    }
    Object.defineProperty(UIProgressCircle.prototype, "size", {
        get: function () { return this._size; },
        set: function (value) {
            this._size = coerceNumber(value);
            this.viewBox = "0 0 " + this._size + " " + this._size;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIProgressCircle.prototype, "thickness", {
        get: function () { return this._thickness; },
        set: function (value) { this._thickness = coerceNumber(value); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIProgressCircle.prototype, "stroke", {
        set: function (value) { this._stroke = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIProgressCircle.prototype, "color", {
        set: function (value) { this.setStrokeColor(value, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIProgressCircle.prototype, "mode", {
        set: function (value) { this._mode = value; this.setMode(value, true); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIProgressCircle.prototype, "value", {
        get: function () {
            if (this.mode === 'determinate') {
                return this.currentValue;
            }
        },
        set: function (v) {
            this.currentValue = coerceNumber(v);
            this.pathAnimation(this._circle.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    UIProgressCircle.prototype.getRelativeValue = function (value, min, max) {
        var clampedValue = Math.min(Math.max(min, value), max);
        return clampedValue / (max - min);
    };
    UIProgressCircle.prototype.getArcLength = function (fraction) {
        return fraction * Math.PI * (this._size - this._thickness);
    };
    // 路径动画
    UIProgressCircle.prototype.pathAnimation = function (path, step) {
        var _this = this;
        if (step === void 0) { step = 0; }
        if (this._mode === 'determinate') {
            var relVal = this.getRelativeValue(this.currentValue, this.min, this.max);
            path.style.strokeDasharray = this.getArcLength(relVal) + ", " + this.getArcLength(1);
            return;
        }
        ;
        step %= 3;
        if (step === 0) {
            path.style.strokeDasharray = this.getArcLength(0) + ", " + this.getArcLength(1);
            path.style.strokeDashoffset = '0';
            path.style.transitionDuration = '0ms';
        }
        else if (step === 1) {
            path.style.strokeDasharray = this.getArcLength(0.7) + ", " + this.getArcLength(1);
            path.style.strokeDashoffset = "" + this.getArcLength(-0.3);
            path.style.transitionDuration = '750ms';
        }
        else {
            path.style.strokeDasharray = this.getArcLength(0.7) + ", " + this.getArcLength(1);
            path.style.strokeDashoffset = "" + this.getArcLength(-1);
            path.style.transitionDuration = '850ms';
        }
        this.pathAnimationTimer = setTimeout(function () { return _this.pathAnimation(path, step + 1); }, step ? 750 : 250);
    };
    // 定义circle背景色
    UIProgressCircle.prototype.setStrokeColor = function (value, isAdd) {
        if (value != null && value !== '') {
            this.renderer.setElementClass(this._circle.nativeElement, "" + value, isAdd);
        }
    };
    // 定义模式并添加对应样式
    UIProgressCircle.prototype.setMode = function (value, isAdd) {
        if (value) {
            this.renderer.setElementClass(this.elementRef.nativeElement, "" + value, isAdd);
        }
    };
    UIProgressCircle.prototype.ngOnInit = function () {
        this.pathAnimation(this._circle.nativeElement);
    };
    UIProgressCircle.decorators = [
        { type: Component, args: [{
                    selector: 'ui-progress-circle',
                    templateUrl: 'progress-circle.html'
                },] },
    ];
    /** @nocollapse */
    UIProgressCircle.ctorParameters = [
        { type: Renderer, },
        { type: ElementRef, },
    ];
    UIProgressCircle.propDecorators = {
        '_circle': [{ type: ViewChild, args: ['circle',] },],
        'size': [{ type: Input },],
        'thickness': [{ type: Input },],
        'stroke': [{ type: Input },],
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'value': [{ type: Input },],
    };
    return UIProgressCircle;
}());
export var UIProgressCircleModule = (function () {
    function UIProgressCircleModule() {
    }
    UIProgressCircleModule.forRoot = function () {
        return {
            ngModule: UIProgressCircleModule,
            providers: []
        };
    };
    UIProgressCircleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [UIProgressCircle],
                    declarations: [UIProgressCircle],
                    providers: [],
                },] },
    ];
    /** @nocollapse */
    UIProgressCircleModule.ctorParameters = [];
    return UIProgressCircleModule;
}());
