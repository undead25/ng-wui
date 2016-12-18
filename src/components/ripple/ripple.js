import { NgModule, Directive, ElementRef, Input } from '@angular/core';
import { getOffset } from '../util';
export var UIRipple = (function () {
    function UIRipple(elementRef) {
        var _this = this;
        this.eventHandlers = new Map();
        this.rippleElement = elementRef.nativeElement;
        this.eventHandlers.set('click', function (event) {
            _this.handleClick(event);
        });
    }
    UIRipple.prototype.ngOnInit = function () {
        if (!this.trigger)
            this.setTriggerElement(this.rippleElement);
    };
    UIRipple.prototype.ngOnDestroy = function () {
        this.rippleDestroy();
    };
    UIRipple.prototype.ngOnChanges = function (changes) {
        var changedInputs = Object.keys(changes);
        if (changedInputs.indexOf('trigger') !== -1) {
            this.setTriggerElement(this.trigger);
        }
    };
    // 销毁ripple
    UIRipple.prototype.rippleDestroy = function () {
        this.setTriggerElement(null);
    };
    // 设置需要triggleElement的事件绑定或者移除
    UIRipple.prototype.setTriggerElement = function (newTrigger) {
        var _this = this;
        if (this.triggerElement !== newTrigger) {
            if (this.triggerElement) {
                this.eventHandlers.forEach(function (eventHandler, eventName) {
                    _this.triggerElement.removeEventListener(eventName, eventHandler);
                });
            }
            this.triggerElement = newTrigger;
            if (this.triggerElement) {
                this.eventHandlers.forEach(function (eventHandler, eventName) {
                    _this.triggerElement.addEventListener(eventName, eventHandler);
                });
            }
        }
    };
    // 鼠标点击事件
    UIRipple.prototype.handleClick = function (event) {
        // 创建ripple HTML 并根据点击目标设置其位置和大小
        var rippleDiv = document.createElement('div');
        rippleDiv.classList.add('ripple');
        this.rippleElement.appendChild(rippleDiv);
        var size = Math.max(this.triggerElement.offsetWidth, this.triggerElement.offsetHeight);
        var rippleTop = getOffset(rippleDiv).top;
        var rippleLeft = getOffset(rippleDiv).left;
        var rippleY = event.pageY - rippleTop - size / 2;
        var rippleX = event.pageX - rippleLeft - size / 2;
        rippleDiv.style.width = size + "px";
        rippleDiv.style.height = size + "px";
        rippleDiv.style.top = rippleY + "px";
        rippleDiv.style.left = rippleX + "px";
        if (this.isDark)
            rippleDiv.classList.add("ripple-dark");
        rippleDiv.classList.add('active');
        this.rippleRemove(rippleDiv);
    };
    // 移除ripple
    UIRipple.prototype.rippleRemove = function (rippleDiv) {
        // 注意transitionend有多个属性
        rippleDiv.addEventListener('transitionend', function (event) {
            if (rippleDiv && event.propertyName === 'opacity')
                rippleDiv.parentNode.removeChild(rippleDiv);
        });
    };
    UIRipple.decorators = [
        { type: Directive, args: [{
                    selector: '[ui-ripple]'
                },] },
    ];
    /** @nocollapse */
    UIRipple.ctorParameters = [
        { type: ElementRef, },
    ];
    UIRipple.propDecorators = {
        'trigger': [{ type: Input, args: ['ripple-trigger',] },],
        'isDark': [{ type: Input, args: ['ripple-dark',] },],
    };
    return UIRipple;
}());
export var UIRippleModule = (function () {
    function UIRippleModule() {
    }
    UIRippleModule.forRoot = function () {
        return {
            ngModule: UIRippleModule,
            providers: []
        };
    };
    UIRippleModule.decorators = [
        { type: NgModule, args: [{
                    exports: [UIRipple],
                    declarations: [UIRipple],
                },] },
    ];
    /** @nocollapse */
    UIRippleModule.ctorParameters = [];
    return UIRippleModule;
}());
